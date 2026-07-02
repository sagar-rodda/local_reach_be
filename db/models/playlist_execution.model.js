const { DataTypes } = require('sequelize');

let tableName = "playlist_executions";

let column_definitions = {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    playlist_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    campaign_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const PlaylistExecution = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false,
        indexes: [
            { fields: ['device_id', 'started_at'] },
            { fields: ['playlist_id'] },
            { fields: ['campaign_id'] },
        ],
    };

    let model = sequelizeInstance.define('playlist_execution', column_definitions, model_options);

    return model;
};

module.exports = PlaylistExecution;
