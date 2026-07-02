const { DataTypes } = require('sequelize');

let tableName = "device_commands";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('REBOOT', 'SHUTDOWN', 'UPDATE_FIRMWARE', 'CLEAR_CACHE', 'SYNC_CONTENT', 'TAKE_SCREENSHOT', 'RESTART_APP', 'SET_VOLUME'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'SENT', 'ACKNOWLEDGED', 'EXECUTING', 'COMPLETED', 'FAILED', 'TIMEOUT'),
        defaultValue: 'PENDING'
    },
    payload: {
        type: DataTypes.JSON,
        allowNull: true
    },
    result: {
        type: DataTypes.JSON,
        allowNull: true
    },
    sent_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    acknowledged_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.UUID,
        allowNull: true
    },
    deleted_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const DeviceCommand = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['device_id', 'status'] },
            { fields: ['status'] },
        ],
    };

    let model = sequelizeInstance.define('device_command', column_definitions, model_options);

    return model;
};

module.exports = DeviceCommand;
