const { DataTypes } = require('sequelize');

let tableName = "thumbnails";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    media_file_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true
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

const Thumbnail = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        createdAt: "created_date",
        updatedAt: false,
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['media_file_id', 'size'] },
        ],
    };

    let model = sequelizeInstance.define('thumbnail', column_definitions, model_options);

    return model;
};

module.exports = Thumbnail;
