const otpUtil = require('../utils/otp.util');
const commonDataLayer = require('../db/common_data_layer');

async function saveEmailOtp(user_id, otp_plain_text, purpose = 'EMAIL_VERIFICATION') {
    const otp_hash = otpUtil.hashOTP(otp_plain_text);
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await commonDataLayer.create('email_otp', {
        user_id,
        otp_hash,
        expires_at,
        purpose
    });
}

async function invalidateUserOtps(user_id, purpose) {
    await commonDataLayer.update(
        'email_otp',
        { status: 'EXPIRED' },
        { where: { user_id, purpose, status: 'ACTIVE' } }
    );
}

async function saveAdminEmailOtp(admin_user_id, otp_plain_text, purpose = 'PASSWORD_RESET') {
    const otp_hash = otpUtil.hashOTP(otp_plain_text);
    const expires_at = new Date(Date.now() + 10 * 60 * 1000);

    await commonDataLayer.create('email_otp', {
        admin_user_id,
        otp_hash,
        expires_at,
        purpose
    });
}

async function invalidateAdminOtps(admin_user_id, purpose) {
    await commonDataLayer.update(
        'email_otp',
        { status: 'EXPIRED' },
        { where: { admin_user_id, purpose, status: 'ACTIVE' } }
    );
}

module.exports = { saveEmailOtp, invalidateUserOtps, saveAdminEmailOtp, invalidateAdminOtps };
