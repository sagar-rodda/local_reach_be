module.exports = {
    app_Port: process.env.PORT,

    // Database
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_dialect: "mysql",

    // Email
    email_host: process.env.EMAIL_HOST,
    email_user: process.env.EMAIL_USER,
    email_password: process.env.EMAIL_PASSWORD,
    email_from: process.env.EMAIL_FROM,
    app_name_for_email: process.env.APP_NAME_FOR_EMAIL,

    // Tokens
    access_token_expiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || '1h',
    refresh_token_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d',
    token_secret: process.env.JWT_TOKEN_SECRET,
};
