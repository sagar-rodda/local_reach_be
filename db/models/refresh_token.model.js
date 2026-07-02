const { DataTypes } = require('sequelize');

let tableName = "refresh_tokens";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    token_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    revoked_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    user_agent: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ip_address: {
        type: DataTypes.STRING(45),
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

const RefreshToken = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['user_id'] },
            { fields: ['expires_at'] },
        ],
    };

    let model = sequelizeInstance.define('refresh_token', column_definitions, model_options);

    return model;
};

module.exports = RefreshToken;
