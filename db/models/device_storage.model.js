const { DataTypes } = require('sequelize');

let tableName = "device_storages";

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
    total_space_mb: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    used_space_mb: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    available_space_mb: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    media_cache_mb: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
};

const DeviceStorage = (sequelizeInstance) => {
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

    let model = sequelizeInstance.define('device_storage', column_definitions, model_options);

    return model;
};

module.exports = DeviceStorage;
