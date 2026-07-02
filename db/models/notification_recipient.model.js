const { DataTypes } = require('sequelize');

let tableName = "notification_recipients";

let column_definitions = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    notification_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    channel: {
        type: DataTypes.ENUM('EMAIL', 'SMS', 'PUSH', 'IN_APP'),
        allowNull: false
    },
    read_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    delivered_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const NotificationRecipient = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false,
        indexes: [
            { fields: ['user_id', 'read_at'] },
            { fields: ['notification_id'] },
        ],
    };

    let model = sequelizeInstance.define('notification_recipient', column_definitions, model_options);

    return model;
};

module.exports = NotificationRecipient;
