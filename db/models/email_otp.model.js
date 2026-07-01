const { DataTypes } = require('sequelize');

let tableName = "email_otps";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    admin_user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    otp_hash: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    purpose: {
        type: DataTypes.ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET', 'CHANGE_PASSWORD', 'LOGIN'),
        allowNull: false,
        defaultValue: 'EMAIL_VERIFICATION'
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'USED', 'EXPIRED'),
        allowNull: false,
        defaultValue: 'ACTIVE'
    }
};

const EmailOtp = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
    };

    let model = sequelizeInstance.define('email_otp', column_definitions, model_options);

    return model;
};

module.exports = EmailOtp;
