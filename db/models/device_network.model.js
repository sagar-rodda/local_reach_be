const { DataTypes } = require('sequelize');

let tableName = "device_networks";

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
    connection_type: {
        type: DataTypes.ENUM('WIFI', 'ETHERNET', 'CELLULAR'),
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    mac_address: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    wifi_ssid: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    signal_strength_dbm: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
};

const DeviceNetwork = (sequelizeInstance) => {
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

    let model = sequelizeInstance.define('device_network', column_definitions, model_options);

    return model;
};

module.exports = DeviceNetwork;
