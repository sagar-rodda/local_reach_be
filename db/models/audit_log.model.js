const { DataTypes } = require('sequelize');

let tableName = "audit_logs";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    admin_user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    action: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    entity_type: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    entity_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    metadata: {
        type: DataTypes.JSON,
        allowNull: true
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
};

const AuditLog = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false
    };

    let model = sequelizeInstance.define('audit_log', column_definitions, model_options);

    return model;
};

module.exports = AuditLog;
