const { DataTypes } = require('sequelize');

let tableName = "notification_preferences";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('SYSTEM', 'DEVICE_OFFLINE', 'CAMPAIGN_APPROVAL', 'CAMPAIGN_EXPIRING', 'SUPPORT_TICKET', 'PLAYBACK_ERROR', 'LOW_STORAGE'),
        allowNull: false
    },
    channel: {
        type: DataTypes.ENUM('EMAIL', 'SMS', 'PUSH', 'IN_APP'),
        allowNull: false
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
};

const NotificationPreference = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        indexes: [
            { unique: true, fields: ['user_id', 'type', 'channel'] },
        ],
    };

    let model = sequelizeInstance.define('notification_preference', column_definitions, model_options);

    return model;
};

module.exports = NotificationPreference;
