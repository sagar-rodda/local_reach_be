const { DataTypes } = require('sequelize');

let tableName = "media_files";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    advertisement_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    media_type: {
        type: DataTypes.ENUM('IMAGE', 'VIDEO', 'AUDIO', 'HTML', 'DOCUMENT'),
        allowNull: false
    },
    current_version_id: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: true
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

const MediaFile = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['advertisement_id'] },
            { fields: ['media_type'] },
        ],
    };

    let model = sequelizeInstance.define('media_file', column_definitions, model_options);

    return model;
};

module.exports = MediaFile;
