const envVarsConfig = require("../../config/env_vars_config");

const APP_NAME = envVarsConfig.app_name_for_email;

function render(data) {
    const { code } = data;

    const subject = `[${APP_NAME}] Password reset code`;

    const text = `Hi,

You requested a password reset for your ${APP_NAME} account.

Your reset code is ${code}.
Enter this code to set a new password.

It expires in 10 minutes.

If you did not request this, you can safely ignore this email.
Thank you, ${APP_NAME}.`;

    const html = `
        <p>Hi,</p>
        <p>You requested a password reset for your <strong>${APP_NAME}</strong> account.</p>
        <p>
            Your reset code is
            <strong style="font-size: 18px; letter-spacing: 2px;">${code}</strong>
        </p>
        <p>Enter this code to set a new password. It expires in <strong>10 minutes</strong>.</p>
        <p style="color: #888; font-size: 13px;">If you did not request this, you can safely ignore this email.</p>
        <p>Thank you, ${APP_NAME}.</p>
    `;

    return { subject, text, html };
}

module.exports = { render };
