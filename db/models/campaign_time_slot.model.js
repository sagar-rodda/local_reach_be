const { DataTypes } = require('sequelize');

let tableName = "campaign_time_slots";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    campaign_schedule_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    end_time: {
        type: DataTypes.STRING(5),
        allowNull: false
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

const CampaignTimeSlot = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['campaign_schedule_id'] },
        ],
    };

    let model = sequelizeInstance.define('campaign_time_slot', column_definitions, model_options);

    return model;
};

module.exports = CampaignTimeSlot;
