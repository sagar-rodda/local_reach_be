const { DataTypes } = require('sequelize');

let tableName = "role_permissions";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    permission_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
};

const RolePermission = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
    };

    let model = sequelizeInstance.define('role_permission', column_definitions, model_options);

    return model;
};

module.exports = RolePermission;
