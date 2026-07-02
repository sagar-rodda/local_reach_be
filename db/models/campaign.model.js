const { DataTypes } = require('sequelize');

let tableName = "campaigns";

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
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED', 'REJECTED'),
        defaultValue: 'DRAFT'
    },
    priority_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    is_emergency_override: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    budget: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
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

const Campaign = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['company_id', 'status'] },
            { fields: ['start_date', 'end_date'] },
            { fields: ['priority_id'] },
        ],
    };

    let model = sequelizeInstance.define('campaign', column_definitions, model_options);

    return model;
};

module.exports = Campaign;
