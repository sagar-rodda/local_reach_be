const { DataTypes } = require('sequelize');

let tableName = "campaign_playlists";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    campaign_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    playlist_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    rotation_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

const CampaignPlaylist = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['campaign_id', 'playlist_id'] },
            { fields: ['playlist_id'] },
        ],
    };

    let model = sequelizeInstance.define('campaign_playlist', column_definitions, model_options);

    return model;
};

module.exports = CampaignPlaylist;
