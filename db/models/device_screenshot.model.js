const { DataTypes } = require('sequelize');

let tableName = "device_screenshots";

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
    file_url: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    captured_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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

const DeviceScreenshot = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        createdAt: "created_date",
        updatedAt: false,
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['device_id', 'captured_at'] },
        ],
    };

    let model = sequelizeInstance.define('device_screenshot', column_definitions, model_options);

    return model;
};

module.exports = DeviceScreenshot;
