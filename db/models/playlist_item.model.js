const { DataTypes } = require('sequelize');

let tableName = "playlist_items";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    playlist_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    advertisement_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration_override_seconds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    transition_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'NONE'
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

const PlaylistItem = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['playlist_id', 'sort_order'] },
            { fields: ['advertisement_id'] },
        ],
    };

    let model = sequelizeInstance.define('playlist_item', column_definitions, model_options);

    return model;
};

module.exports = PlaylistItem;
