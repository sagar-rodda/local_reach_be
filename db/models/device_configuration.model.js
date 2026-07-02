const { DataTypes } = require('sequelize');

let tableName = "device_configurations";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    volume: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 50
    },
    brightness: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 80
    },
    timezone: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    screen_on_time: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    screen_off_time: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    heartbeat_interval_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 60
    },
    extra_settings: {
        type: DataTypes.JSON,
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

const DeviceConfiguration = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
    };

    let model = sequelizeInstance.define('device_configuration', column_definitions, model_options);

    return model;
};

module.exports = DeviceConfiguration;
