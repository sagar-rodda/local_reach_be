const { DataTypes } = require('sequelize');

let tableName = "advertisement_impressions";

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
        allowNull: false
    },
    campaign_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    played_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    planned_duration_seconds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    actual_duration_seconds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    was_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
};

const AdvertisementImpression = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false,
        indexes: [
            { fields: ['device_id', 'played_at'] },
            { fields: ['campaign_id', 'played_at'] },
            { fields: ['advertisement_id', 'played_at'] },
        ],
    };

    let model = sequelizeInstance.define('advertisement_impression', column_definitions, model_options);

    return model;
};

module.exports = AdvertisementImpression;
