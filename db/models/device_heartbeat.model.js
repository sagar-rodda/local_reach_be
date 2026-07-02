const { DataTypes } = require('sequelize');

let tableName = "device_heartbeats";

let column_definitions = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING_ACTIVATION', 'ONLINE', 'OFFLINE', 'MAINTENANCE', 'ERROR', 'DECOMMISSIONED'),
        allowNull: false
    },
    battery_level: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
};

const DeviceHeartbeat = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false,
        indexes: [
            { fields: ['device_id', 'created_date'] },
        ],
    };

    let model = sequelizeInstance.define('device_heartbeat', column_definitions, model_options);

    return model;
};

module.exports = DeviceHeartbeat;
