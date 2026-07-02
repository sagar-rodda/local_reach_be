const { DataTypes } = require('sequelize');

let tableName = "device_health";

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
    cpu_usage_percent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    memory_usage_percent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    temperature_celsius: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    uptime_seconds: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
};

const DeviceHealth = (sequelizeInstance) => {
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

    let model = sequelizeInstance.define('device_health', column_definitions, model_options);

    return model;
};

module.exports = DeviceHealth;
