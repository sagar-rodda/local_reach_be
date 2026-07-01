const { DataTypes } = require('sequelize');

let tableName = "users";

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
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    avatar_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    user_type: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    status: {
        type: DataTypes.ENUM('PENDING_VERIFICATION', 'ACTIVE', 'IN_ACTIVE', 'SUSPENDED', 'DELETED'),
        defaultValue: 'PENDING_VERIFICATION'
    },
    last_logged_in: {
        type: DataTypes.DATE,
        allowNull: true
    },
    terms_accepted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const User = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
    };

    let model = sequelizeInstance.define('user', column_definitions, model_options);

    return model;
};

module.exports = User;
