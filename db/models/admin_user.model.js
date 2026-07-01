const { DataTypes } = require('sequelize');

let tableName = "admin_users";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'IN_ACTIVE', 'SUSPENDED', 'DELETED'),
        defaultValue: 'ACTIVE'
    },
    last_sign_in: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const AdminUser = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
    };

    let model = sequelizeInstance.define('admin_user', column_definitions, model_options);

    return model;
};

module.exports = AdminUser;
