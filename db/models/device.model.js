const { DataTypes } = require('sequelize');

let tableName = "devices";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    store_location_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    current_group_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    serial_number: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    device_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('PENDING_ACTIVATION', 'ONLINE', 'OFFLINE', 'MAINTENANCE', 'ERROR', 'DECOMMISSIONED'),
        defaultValue: 'PENDING_ACTIVATION'
    },
    model: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    os_version: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    player_version: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    orientation: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'LANDSCAPE'
    },
    resolution_width: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    resolution_height: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    activated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    last_seen_at: {
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

const Device = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['company_id', 'serial_number'] },
            { fields: ['status'] },
            { fields: ['store_location_id'] },
            { fields: ['current_group_id'] },
            { fields: ['last_seen_at'] },
        ],
    };

    let model = sequelizeInstance.define('device', column_definitions, model_options);

    return model;
};

module.exports = Device;
