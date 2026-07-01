const envVarsConfig = require("../../config/env_vars_config");

const APP_NAME = envVarsConfig.app_name_for_email;

function render(data) {
    const subject = `[${APP_NAME}] Your password has been changed`;

    const text = `Hi,

Your ${APP_NAME} account password was changed successfully.

If you did not make this change, please contact support immediately.

Thank you, ${APP_NAME}.`;

    const html = `
        <p>Hi,</p>
        <p>Your <strong>${APP_NAME}</strong> account password was changed successfully.</p>
        <p style="color: #e74c3c;">If you did not make this change, please contact support immediately.</p>
        <p>Thank you, ${APP_NAME}.</p>
    `;

    return { subject, text, html };
}

module.exports = { render };
