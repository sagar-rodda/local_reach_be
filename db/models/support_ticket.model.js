const { DataTypes } = require('sequelize');

let tableName = "support_tickets";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    requester_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    assignee_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    subject: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'WAITING_ON_CUSTOMER', 'RESOLVED', 'CLOSED'),
        defaultValue: 'OPEN'
    },
    priority: {
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
        defaultValue: 'MEDIUM'
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

const SupportTicket = (sequelizeInstance) => {
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
            { fields: ['assignee_id'] },
            { fields: ['requester_id'] },
        ],
    };

    let model = sequelizeInstance.define('support_ticket', column_definitions, model_options);

    return model;
};

module.exports = SupportTicket;
