const { DataTypes } = require('sequelize');

let tableName = "campaign_schedules";

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
    schedule_type: {
        type: DataTypes.ENUM('ONE_TIME', 'DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'),
        defaultValue: 'ONE_TIME'
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    days_of_week: {
        type: DataTypes.JSON,
        allowNull: true
    },
    day_of_month: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cron_expression: {
        type: DataTypes.STRING(100),
        allowNull: true
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

const CampaignSchedule = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['campaign_id'] },
        ],
    };

    let model = sequelizeInstance.define('campaign_schedule', column_definitions, model_options);

    return model;
};

module.exports = CampaignSchedule;
