const { TokenExpiredError } = require('jsonwebtoken');

const {
    validateSignUp,
    validateSignIn,
    validateSignInVerifyOtp,
    validateEmailVerification,
    validateResendOtp,
    validateForgotPassword,
    validateResetPassword,
    validateAdminResetPassword,
    validateAdminChangePasswordRequest,
    validateAdminChangePasswordConfirm,
} = require('../validators/auth.validators');

const passwordUtil = require('../../utils/password.util');
const jwtUtil = require('../../utils/jwt.util');
const otpUtil = require('../../utils/otp.util');
const commonDataLayer = require('../../db/common_data_layer');
const emailService = require('../../services/email.service');
const otpService = require('../../services/otp.service');
const audit = require('../../utils/audit.util');
const sequelize = require('../../db/setup/sequelize_config');

const { saveEmailOtp, invalidateUserOtps, saveAdminEmailOtp, invalidateAdminOtps } = otpService;

// ── User Auth ─────────────────────────────────────────────────────────

async function signUp(req, res) {
    try {
        const validation = validateSignUp(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { email, password, first_name, last_name, phone } = req.body;

        const pwdValidation = passwordUtil.validatePasswordStrength(password);
        if (!pwdValidation.isValid) {
            return res.status(400).json({ success: false, errors: pwdValidation.errors });
        }

        const existing = await commonDataLayer.get('user', { where: { email: email.toLowerCase() } });
        if (existing) {
            return res.status(409).json({ success: false, message: 'An account already exists with this email' });
        }

        const password_hash = await passwordUtil.hashPassword(password);
        const now = new Date();

        const user = await commonDataLayer.create('user', {
            email: email.toLowerCase(),
            first_name,
            last_name,
            password_hash,
            phone: phone ?? null,
            terms_accepted_at: now,
            status: 'PENDING_VERIFICATION',
        });

        const otp = otpUtil.generateOTP();
        await Promise.all([
            emailService.sendOTP(user.email, otp),
            saveEmailOtp(user.id, otp, 'EMAIL_VERIFICATION'),
        ]);

        return res.status(201).json({
            success: true,
            message: 'Account created successfully. Please check your email for the verification code.',
            data: {
                user_id: user.id,
                email: user.email,
                status: user.status,
            },
        });

    } catch (error) {
        console.error('[signUp]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function verifyEmail(req, res) {
    try {
        const validation = validateEmailVerification(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { user_id, otp } = req.body;

        const [user, otpRecord] = await Promise.all([
            commonDataLayer.get('user', {
                where: { id: user_id },
                include: [{ model: sequelize.models.role, as: 'roles', through: { attributes: [] } }],
            }),
            commonDataLayer.get('email_otp', {
                where: { user_id, purpose: 'EMAIL_VERIFICATION', status: 'ACTIVE' },
            }),
        ]);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.status !== 'PENDING_VERIFICATION') {
            return res.status(400).json({ success: false, message: 'Email is already verified' });
        }

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (new Date(otpRecord.expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        if (otpUtil.hashOTP(otp) !== otpRecord.otp_hash) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        const t = await sequelize.transaction();
        try {
            await commonDataLayer.update('user', { status: 'ACTIVE' }, { where: { id: user_id }, transaction: t });
            await commonDataLayer.deleteRecord('email_otp', { where: { id: otpRecord.id }, transaction: t });
            await t.commit();
        } catch (txError) {
            await t.rollback();
            throw txError;
        }

        const roles = (user.roles ?? []).map(r => ({ role_id: r.id, role_name: r.role }));
        const { access_token, refresh_token } = jwtUtil.generateTokenPair({
            user_id: user.id,
            email: user.email,
            roles,
            user_type: user.user_type,
        });

        return res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            data: {
                user: {
                    user_id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_type: user.user_type,
                    status: 'ACTIVE',
                },
                auth_tokens: { access_token, refresh_token },
            },
        });

    } catch (error) {
        console.error('[verifyEmail]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

/**
 * Step 1 of OTP login: validate credentials, send OTP.
 * Returns user_id so the client can pass it to /signin/verify-otp.
 */
async function signInInitiate(req, res) {
    try {
        const validation = validateSignIn(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { email, password } = req.body;

        const user = await commonDataLayer.get('user', { where: { email: email.toLowerCase() } });

        // Use generic message to avoid account enumeration
        const invalidMsg = 'Invalid email or password';

        if (!user) {
            return res.status(401).json({ success: false, message: invalidMsg });
        }

        if (user.status === 'PENDING_VERIFICATION') {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email before signing in',
                data: { user_id: user.id },
            });
        }

        if (user.status !== 'ACTIVE') {
            return res.status(403).json({ success: false, message: 'Your account is not active. Please contact support' });
        }

        const isPasswordValid = await passwordUtil.verifyPassword(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: invalidMsg });
        }

        // Invalidate any existing LOGIN OTPs and send a fresh one
        await invalidateUserOtps(user.id, 'LOGIN');

        const otp = otpUtil.generateOTP();
        await Promise.all([
            emailService.sendOTP(user.email, otp),
            saveEmailOtp(user.id, otp, 'LOGIN'),
        ]);

        return res.status(200).json({
            success: true,
            message: 'A verification code has been sent to your email',
            data: { user_id: user.id },
        });

    } catch (error) {
        console.error('[signInInitiate]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

/**
 * Step 2 of OTP login: verify OTP, return tokens.
 */
async function signInVerifyOtp(req, res) {
    try {
        const validation = validateSignInVerifyOtp(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { user_id, otp } = req.body;

        const [user, otpRecord] = await Promise.all([
            commonDataLayer.get('user', {
                where: { id: user_id },
                include: [{ model: sequelize.models.role, as: 'roles', through: { attributes: [] } }],
            }),
            commonDataLayer.get('email_otp', {
                where: { user_id, purpose: 'LOGIN', status: 'ACTIVE' },
            }),
        ]);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (new Date(otpRecord.expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        if (otpUtil.hashOTP(otp) !== otpRecord.otp_hash) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        const t = await sequelize.transaction();
        try {
            await commonDataLayer.update('user', { last_logged_in: new Date() }, { where: { id: user_id }, transaction: t });
            await commonDataLayer.deleteRecord('email_otp', { where: { id: otpRecord.id }, transaction: t });
            await t.commit();
        } catch (txError) {
            await t.rollback();
            throw txError;
        }

        const roles = (user.roles ?? []).map(r => ({ role_id: r.id, role_name: r.role }));
        const { access_token, refresh_token } = jwtUtil.generateTokenPair({
            user_id: user.id,
            email: user.email,
            roles,
            user_type: user.user_type,
        });

        return res.status(200).json({
            success: true,
            message: 'Signed in successfully',
            data: {
                user: {
                    user_id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_type: user.user_type,
                    status: user.status,
                },
                auth_tokens: { access_token, refresh_token },
            },
        });

    } catch (error) {
        console.error('[signInVerifyOtp]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function resendOtp(req, res) {
    try {
        const validation = validateResendOtp(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { user_id, email, purpose } = req.body;

        const whereClause = purpose === 'PASSWORD_RESET'
            ? { email: email.toLowerCase() }
            : { id: user_id };

        const user = await commonDataLayer.get('user', { where: whereClause });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (purpose === 'EMAIL_VERIFICATION' && user.status !== 'PENDING_VERIFICATION') {
            return res.status(400).json({ success: false, message: 'Email is already verified' });
        }

        if ((purpose === 'PASSWORD_RESET' || purpose === 'LOGIN') && user.status !== 'ACTIVE') {
            return res.status(400).json({ success: false, message: 'Account is not active' });
        }

        await invalidateUserOtps(user.id, purpose);

        const otp = otpUtil.generateOTP();
        const emailAction = purpose === 'PASSWORD_RESET' ? 'PASSWORD_RESET' : 'OTP_VERIFICATION';
        await Promise.all([
            emailService.sendEmail(emailAction, user.email, { code: otp }),
            saveEmailOtp(user.id, otp, purpose),
        ]);

        return res.status(200).json({ success: true, message: 'Verification code resent successfully' });

    } catch (error) {
        console.error('[resendOtp]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function forgotPassword(req, res) {
    try {
        const validation = validateForgotPassword(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { email } = req.body;
        const user = await commonDataLayer.get('user', { where: { email: email.toLowerCase() } });

        // Always return 200 to avoid account enumeration
        if (!user || user.status !== 'ACTIVE') {
            return res.status(200).json({
                success: true,
                message: 'If an account exists for this email, a reset code has been sent',
            });
        }

        await invalidateUserOtps(user.id, 'PASSWORD_RESET');

        const otp = otpUtil.generateOTP();
        await Promise.all([
            emailService.sendEmail('PASSWORD_RESET', email, { code: otp }),
            saveEmailOtp(user.id, otp, 'PASSWORD_RESET'),
        ]);

        return res.status(200).json({
            success: true,
            message: 'If an account exists for this email, a reset code has been sent',
            data: { user_id: user.id },
        });

    } catch (error) {
        console.error('[forgotPassword]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function resetPassword(req, res) {
    try {
        const validation = validateResetPassword(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { user_id, otp, new_password } = req.body;

        const pwdValidation = passwordUtil.validatePasswordStrength(new_password);
        if (!pwdValidation.isValid) {
            return res.status(400).json({ success: false, errors: pwdValidation.errors });
        }

        const otpRecord = await commonDataLayer.get('email_otp', {
            where: { user_id, purpose: 'PASSWORD_RESET', status: 'ACTIVE' },
        });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });
        }

        if (new Date(otpRecord.expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: 'Reset code has expired' });
        }

        if (otpUtil.hashOTP(otp) !== otpRecord.otp_hash) {
            return res.status(400).json({ success: false, message: 'Invalid reset code' });
        }

        const password_hash = await passwordUtil.hashPassword(new_password);

        const t = await sequelize.transaction();
        try {
            await commonDataLayer.update('user', { password_hash }, { where: { id: user_id }, transaction: t });
            await commonDataLayer.deleteRecord('email_otp', { where: { id: otpRecord.id }, transaction: t });
            await t.commit();
        } catch (txError) {
            await t.rollback();
            throw txError;
        }

        return res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        console.error('[resetPassword]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function refreshToken(req, res) {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(400).json({ success: false, message: 'refresh_token is required' });
        }

        const payload = jwtUtil.verifyRefreshToken(refresh_token);

        const tokens = jwtUtil.generateTokenPair({
            user_id: payload.user_id,
            email: payload.email,
            roles: payload.roles,
            user_type: payload.user_type,
        });

        return res.status(200).json({ success: true, data: tokens });

    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({ success: false, message: 'Refresh token has expired. Please sign in again' });
        }
        return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
}

// ── Admin Auth ────────────────────────────────────────────────────────

async function adminSignIn(req, res) {
    try {
        const validation = validateSignIn(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { email, password } = req.body;

        const adminUser = await commonDataLayer.get('admin_user', {
            where: { email: email.toLowerCase() },
            include: [{ model: sequelize.models.role, as: 'roles', through: { attributes: [] } }],
        });

        if (!adminUser) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (adminUser.status !== 'ACTIVE') {
            return res.status(403).json({ success: false, message: 'Your account is not active. Please contact support' });
        }

        const isPasswordValid = await passwordUtil.verifyPassword(password, adminUser.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        await commonDataLayer.update('admin_user', { last_sign_in: new Date() }, { where: { id: adminUser.id } });

        const roles = (adminUser.roles ?? []).map(r => ({ role_id: r.id, role_name: r.role }));
        const { access_token, refresh_token } = jwtUtil.generateTokenPair({
            admin_id: adminUser.id,
            email: adminUser.email,
            roles,
            user_type: 'admin',
        });

        await audit.log(req, {
            admin_user_id: adminUser.id,
            action: audit.ACTIONS.ADMIN_LOGIN,
            entity_type: audit.ENTITY_TYPES.ADMIN_USER,
            entity_id: adminUser.id,
            description: `Admin signed in: ${adminUser.email}`,
        });

        return res.status(200).json({
            success: true,
            message: 'Signed in successfully',
            data: {
                admin: {
                    admin_id: adminUser.id,
                    first_name: adminUser.first_name,
                    last_name: adminUser.last_name,
                    email: adminUser.email,
                    roles,
                    status: adminUser.status,
                },
                auth_tokens: { access_token, refresh_token },
            },
        });

    } catch (error) {
        console.error('[adminSignIn]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function adminForgotPassword(req, res) {
    try {
        const validation = validateForgotPassword(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { email } = req.body;
        const adminUser = await commonDataLayer.get('admin_user', { where: { email: email.toLowerCase() } });

        if (!adminUser || adminUser.status !== 'ACTIVE') {
            return res.status(200).json({
                success: true,
                message: 'If an account exists for this email, a reset code has been sent',
            });
        }

        await invalidateAdminOtps(adminUser.id, 'PASSWORD_RESET');

        const otp = otpUtil.generateOTP();
        await Promise.all([
            emailService.sendEmail('PASSWORD_RESET', email, { code: otp }),
            saveAdminEmailOtp(adminUser.id, otp, 'PASSWORD_RESET'),
        ]);

        return res.status(200).json({
            success: true,
            message: 'If an account exists for this email, a reset code has been sent',
            data: { admin_id: adminUser.id },
        });

    } catch (error) {
        console.error('[adminForgotPassword]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function adminResetPassword(req, res) {
    try {
        const validation = validateAdminResetPassword(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { admin_id, otp, new_password } = req.body;

        const pwdValidation = passwordUtil.validatePasswordStrength(new_password);
        if (!pwdValidation.isValid) {
            return res.status(400).json({ success: false, errors: pwdValidation.errors });
        }

        const otpRecord = await commonDataLayer.get('email_otp', {
            where: { admin_user_id: admin_id, purpose: 'PASSWORD_RESET', status: 'ACTIVE' },
        });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });
        }

        if (new Date(otpRecord.expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: 'Reset code has expired' });
        }

        if (otpUtil.hashOTP(otp) !== otpRecord.otp_hash) {
            return res.status(400).json({ success: false, message: 'Invalid reset code' });
        }

        const password_hash = await passwordUtil.hashPassword(new_password);

        const t = await sequelize.transaction();
        try {
            await commonDataLayer.update('admin_user', { password_hash }, { where: { id: admin_id }, transaction: t });
            await commonDataLayer.deleteRecord('email_otp', { where: { id: otpRecord.id }, transaction: t });
            await t.commit();
        } catch (txError) {
            await t.rollback();
            throw txError;
        }

        await audit.log(req, {
            admin_user_id: admin_id,
            action: audit.ACTIONS.PASSWORD_RESET,
            entity_type: audit.ENTITY_TYPES.ADMIN_USER,
            entity_id: admin_id,
            description: 'Admin password reset via OTP',
        });

        return res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        console.error('[adminResetPassword]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function adminChangePasswordRequest(req, res) {
    try {
        const validation = validateAdminChangePasswordRequest(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { currentPassword, newPassword } = req.body;
        const admin_id = req.user.admin_id;

        const adminUser = await commonDataLayer.get('admin_user', { where: { id: admin_id } });
        if (!adminUser) {
            return res.status(404).json({ success: false, message: 'Admin user not found' });
        }

        const isCurrentValid = await passwordUtil.verifyPassword(currentPassword, adminUser.password_hash);
        if (!isCurrentValid) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        const isSame = await passwordUtil.verifyPassword(newPassword, adminUser.password_hash);
        if (isSame) {
            return res.status(400).json({ success: false, message: 'New password must be different from the current password' });
        }

        const pwdValidation = passwordUtil.validatePasswordStrength(newPassword);
        if (!pwdValidation.isValid) {
            return res.status(400).json({ success: false, errors: pwdValidation.errors });
        }

        await invalidateAdminOtps(admin_id, 'CHANGE_PASSWORD');

        const otp = otpUtil.generateOTP();
        await Promise.all([
            emailService.sendEmail('PASSWORD_RESET', adminUser.email, { code: otp }),
            saveAdminEmailOtp(admin_id, otp, 'CHANGE_PASSWORD'),
        ]);

        return res.status(200).json({ success: true, message: 'Verification code sent to your email' });

    } catch (error) {
        console.error('[adminChangePasswordRequest]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

async function adminChangePasswordConfirm(req, res) {
    try {
        const validation = validateAdminChangePasswordConfirm(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        const { newPassword, otp } = req.body;
        const admin_id = req.user.admin_id;

        const pwdValidation = passwordUtil.validatePasswordStrength(newPassword);
        if (!pwdValidation.isValid) {
            return res.status(400).json({ success: false, errors: pwdValidation.errors });
        }

        const [adminUser, otpRecord] = await Promise.all([
            commonDataLayer.get('admin_user', { where: { id: admin_id } }),
            commonDataLayer.get('email_otp', {
                where: { admin_user_id: admin_id, purpose: 'CHANGE_PASSWORD', status: 'ACTIVE' },
            }),
        ]);

        if (!adminUser) {
            return res.status(404).json({ success: false, message: 'Admin user not found' });
        }

        const isSame = await passwordUtil.verifyPassword(newPassword, adminUser.password_hash);
        if (isSame) {
            return res.status(400).json({ success: false, message: 'New password must be different from the current password' });
        }

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
        }

        if (new Date(otpRecord.expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: 'Verification code has expired' });
        }

        if (otpUtil.hashOTP(otp) !== otpRecord.otp_hash) {
            return res.status(400).json({ success: false, message: 'Invalid verification code' });
        }

        const password_hash = await passwordUtil.hashPassword(newPassword);

        const t = await sequelize.transaction();
        try {
            await commonDataLayer.update('admin_user', { password_hash }, { where: { id: admin_id }, transaction: t });
            await commonDataLayer.deleteRecord('email_otp', { where: { id: otpRecord.id }, transaction: t });
            await t.commit();
        } catch (txError) {
            await t.rollback();
            throw txError;
        }

        await Promise.all([
            emailService.sendEmail('PASSWORD_CHANGED', adminUser.email, {}),
            audit.log(req, {
                admin_user_id: admin_id,
                action: audit.ACTIONS.ADMIN_PASSWORD_CHANGED,
                entity_type: audit.ENTITY_TYPES.ADMIN_USER,
                entity_id: admin_id,
                description: 'Admin changed account password',
            }),
        ]);

        return res.status(200).json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        console.error('[adminChangePasswordConfirm]', error);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
}

module.exports = {
    // User
    signUp,
    verifyEmail,
    signInInitiate,
    signInVerifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    refreshToken,
    // Admin
    adminSignIn,
    adminForgotPassword,
    adminResetPassword,
    adminChangePasswordRequest,
    adminChangePasswordConfirm,
};
