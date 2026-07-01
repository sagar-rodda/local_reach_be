const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignUp(body) {
    const errors = [];
    const { email, password, first_name, last_name } = body;

    if (!email) {
        errors.push('Email is required');
    } else if (!EMAIL_REGEX.test(email)) {
        errors.push('Invalid email format');
    }

    if (!first_name) errors.push('First name is required');
    if (!last_name) errors.push('Last name is required');

    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    return { isValid: errors.length === 0, errors };
}

function validateSignIn(body) {
    const errors = [];
    const { email, password } = body;

    if (!email) {
        errors.push('Email is required');
    } else if (!EMAIL_REGEX.test(email)) {
        errors.push('Invalid email format');
    }

    if (!password) errors.push('Password is required');

    return { isValid: errors.length === 0, errors };
}

function validateSignInVerifyOtp(body) {
    const errors = [];
    const { user_id, otp } = body;

    if (!user_id) errors.push('user_id is required');
    if (!otp) errors.push('otp is required');

    return { isValid: errors.length === 0, errors };
}

function validateEmailVerification(body) {
    const errors = [];
    const { user_id, otp } = body;

    if (!user_id) errors.push('user_id is required');
    if (!otp) errors.push('otp is required');

    return { isValid: errors.length === 0, errors };
}

function validateResendOtp(body) {
    const errors = [];
    const { user_id, email, purpose } = body;

    const validPurposes = ['EMAIL_VERIFICATION', 'PASSWORD_RESET', 'LOGIN'];
    if (!purpose) {
        errors.push('purpose is required');
    } else if (!validPurposes.includes(purpose)) {
        errors.push('purpose must be EMAIL_VERIFICATION, LOGIN, or PASSWORD_RESET');
    } else if (purpose === 'EMAIL_VERIFICATION' && !user_id) {
        errors.push('user_id is required for EMAIL_VERIFICATION');
    } else if (purpose === 'LOGIN' && !user_id) {
        errors.push('user_id is required for LOGIN');
    } else if (purpose === 'PASSWORD_RESET') {
        if (!email) {
            errors.push('email is required for PASSWORD_RESET');
        } else if (!EMAIL_REGEX.test(email)) {
            errors.push('Invalid email format');
        }
    }

    return { isValid: errors.length === 0, errors };
}

function validateForgotPassword(body) {
    const errors = [];
    const { email } = body;

    if (!email) {
        errors.push('Email is required');
    } else if (!EMAIL_REGEX.test(email)) {
        errors.push('Invalid email format');
    }

    return { isValid: errors.length === 0, errors };
}

function validateResetPassword(body) {
    const errors = [];
    const { user_id, otp, new_password } = body;

    if (!user_id) errors.push('user_id is required');
    if (!otp) errors.push('otp is required');
    if (!new_password) errors.push('new_password is required');

    return { isValid: errors.length === 0, errors };
}

function validateAdminResetPassword(body) {
    const errors = [];
    const { admin_id, otp, new_password } = body;

    if (!admin_id) errors.push('admin_id is required');
    if (!otp) errors.push('otp is required');
    if (!new_password) errors.push('new_password is required');

    return { isValid: errors.length === 0, errors };
}

function validateAdminChangePasswordRequest(body) {
    const errors = [];
    const { currentPassword, newPassword } = body;

    if (!currentPassword) errors.push('currentPassword is required');
    if (!newPassword) errors.push('newPassword is required');

    return { isValid: errors.length === 0, errors };
}

function validateAdminChangePasswordConfirm(body) {
    const errors = [];
    const { newPassword, otp } = body;

    if (!newPassword) errors.push('newPassword is required');
    if (!otp) errors.push('otp is required');

    return { isValid: errors.length === 0, errors };
}

module.exports = {
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
};
