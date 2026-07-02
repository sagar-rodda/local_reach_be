const { DataTypes } = require('sequelize');

let tableName = "playback_histories";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    advertisement_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    campaign_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    playback_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total_plays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_errors: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_duration_seconds: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    }
};

const PlaybackHistory = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        indexes: [
            { unique: true, fields: ['device_id', 'advertisement_id', 'playback_date'] },
            { fields: ['campaign_id', 'playback_date'] },
        ],
    };

    let model = sequelizeInstance.define('playback_history', column_definitions, model_options);

    return model;
};

module.exports = PlaybackHistory;
