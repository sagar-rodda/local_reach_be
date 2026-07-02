const { DataTypes } = require('sequelize');

let tableName = "areas";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    city_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING(20),
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

const Area = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['city_id', 'name'] },
        ],
    };

    let model = sequelizeInstance.define('area', column_definitions, model_options);

    return model;
};

module.exports = Area;
