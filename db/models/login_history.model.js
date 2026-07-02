const { DataTypes } = require('sequelize');

let tableName = "login_histories";

let column_definitions = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    success: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    user_agent: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    failure_reason: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
};

const LoginHistory = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false,
        indexes: [
            { fields: ['user_id'] },
            { fields: ['email'] },
            { fields: ['created_date'] },
        ],
    };

    let model = sequelizeInstance.define('login_history', column_definitions, model_options);

    return model;
};

module.exports = LoginHistory;
