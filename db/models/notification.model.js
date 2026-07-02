const { DataTypes } = require('sequelize');

let tableName = "notifications";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('SYSTEM', 'DEVICE_OFFLINE', 'CAMPAIGN_APPROVAL', 'CAMPAIGN_EXPIRING', 'SUPPORT_TICKET', 'PLAYBACK_ERROR', 'LOW_STORAGE'),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: true
    },
    deleted_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const Notification = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        createdAt: "created_date",
        updatedAt: false,
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['company_id', 'type'] },
            { fields: ['created_date'] },
        ],
    };

    let model = sequelizeInstance.define('notification', column_definitions, model_options);

    return model;
};

module.exports = Notification;
