const envVarsConfig = require("../../config/env_vars_config");

const APP_NAME = envVarsConfig.app_name_for_email;

function render(data) {
    const { code } = data;

    const subject = `[${APP_NAME}] Your verification code`;

    const text = `Welcome to ${APP_NAME}

Your verification code is ${code}.
Please enter this code to complete your verification.

It expires in 10 minutes.
Thank you for choosing ${APP_NAME}.`;

    const html = `
        <p>Welcome to <strong>${APP_NAME}</strong>!</p>
        <p>
            Your verification code is
            <strong style="font-size: 18px; letter-spacing: 2px;">${code}</strong>
        </p>
        <p>Please enter this code to complete your login.</p>
        <p>This code expires in <strong>10 minutes</strong>.<br /><br />
        Thank you for choosing ${APP_NAME}.</p>
    `;

    return { subject, text, html };
}

module.exports = { render };
