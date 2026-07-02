const { DataTypes } = require('sequelize');

let tableName = "advertisement_tags";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    advertisement_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    media_tag_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: true
    },
    deleted_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const AdvertisementTag = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        createdAt: "created_date",
        updatedAt: false,
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['advertisement_id', 'media_tag_id'] },
            { fields: ['media_tag_id'] },
        ],
    };

    let model = sequelizeInstance.define('advertisement_tag', column_definitions, model_options);

    return model;
};

module.exports = AdvertisementTag;
