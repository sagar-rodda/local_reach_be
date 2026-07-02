const { DataTypes } = require('sequelize');

let tableName = "device_assignments";

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
    device_group_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'ENDED'),
        defaultValue: 'ACTIVE'
    },
    assigned_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    unassigned_at: {
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

const DeviceAssignment = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['device_id'] },
            { fields: ['device_group_id'] },
            { fields: ['status'] },
        ],
    };

    let model = sequelizeInstance.define('device_assignment', column_definitions, model_options);

    return model;
};

module.exports = DeviceAssignment;
