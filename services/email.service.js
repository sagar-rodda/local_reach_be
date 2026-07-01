const nodemailer = require("nodemailer");
const envVars = require("../config/env_vars_config");
const TEMPLATE_MAP = require("../utils/email_templates/templateMap");

const transporter = nodemailer.createTransport({
    host: envVars.email_host,
    port: 587,
    auth: {
        user: envVars.email_user,
        pass: envVars.email_password,
    },
});

async function sendEmail(action, to, data, attachments = []) {
    const template = TEMPLATE_MAP[action];
    if (!template) {
        throw new Error(`Unknown email action: "${action}". Check utils/email_templates/templateMap.js`);
    }

    const { subject, text, html } = template.render(data);

    await transporter.sendMail({
        from: envVars.email_from,
        to,
        subject,
        text,
        html,
        attachments,
    });

    console.log(`[EmailService] Sent "${action}" email to ${to}`);
}

async function sendOTP(email, code) {
    await sendEmail("OTP_VERIFICATION", email, { code });
}

module.exports = { sendEmail, sendOTP };
