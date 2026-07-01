const { DataTypes } = require('sequelize');

let tableName = "roles";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    role: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'IN_ACTIVE'),
        defaultValue: 'ACTIVE'
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

const Role = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
    };

    let model = sequelizeInstance.define('role', column_definitions, model_options);

    return model;
};

module.exports = Role;
