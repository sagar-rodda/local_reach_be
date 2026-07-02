const { DataTypes } = require('sequelize');

let tableName = "device_logs";

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
    level: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    context: {
        type: DataTypes.JSON,
        allowNull: true
    }
};

const DeviceLog = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false,
        indexes: [
            { fields: ['device_id', 'created_date'] },
            { fields: ['level'] },
        ],
    };

    let model = sequelizeInstance.define('device_log', column_definitions, model_options);

    return model;
};

module.exports = DeviceLog;
