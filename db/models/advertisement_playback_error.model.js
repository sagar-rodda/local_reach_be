const { DataTypes } = require('sequelize');

let tableName = "advertisement_playback_errors";

let column_definitions = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    playlist_execution_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    advertisement_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    campaign_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    error_type: {
        type: DataTypes.ENUM('FILE_NOT_FOUND', 'CODEC_ERROR', 'NETWORK_ERROR', 'STORAGE_FULL', 'PLAYER_CRASH', 'TIMEOUT', 'UNKNOWN'),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    occurred_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
};

const AdvertisementPlaybackError = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: false,
        indexes: [
            { fields: ['device_id', 'occurred_at'] },
            { fields: ['error_type'] },
        ],
    };

    let model = sequelizeInstance.define('advertisement_playback_error', column_definitions, model_options);

    return model;
};

module.exports = AdvertisementPlaybackError;
