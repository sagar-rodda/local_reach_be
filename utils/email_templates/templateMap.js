const TEMPLATE_MAP = {
    OTP_VERIFICATION: require("./otp_verification"),
    PASSWORD_RESET: require("./password_reset"),
    PASSWORD_CHANGED: require("./password_changed"),
};

module.exports = TEMPLATE_MAP;
