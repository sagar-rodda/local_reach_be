const { DataTypes } = require('sequelize');

let tableName = "store_locations";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    store_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    area_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    country_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    state_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    city_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    label: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    address_line: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    postal_code: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true
    },
    timezone: {
        type: DataTypes.STRING(50),
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

const StoreLocation = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['store_id'] },
            { fields: ['area_id'] },
            { fields: ['city_id'] },
            { fields: ['state_id'] },
            { fields: ['country_id'] },
        ],
    };

    let model = sequelizeInstance.define('store_location', column_definitions, model_options);

    return model;
};

module.exports = StoreLocation;
