const { DataTypes } = require('sequelize');

let tableName = "campaign_status_histories";

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
    from_status: {
        type: DataTypes.ENUM('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED', 'REJECTED'),
        allowNull: true
    },
    to_status: {
        type: DataTypes.ENUM('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED', 'REJECTED'),
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    changed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    changed_by: {
        type: DataTypes.UUID,
        allowNull: true
    }
};

const CampaignStatusHistory = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: false,
        indexes: [
            { fields: ['campaign_id', 'changed_at'] },
        ],
    };

    let model = sequelizeInstance.define('campaign_status_history', column_definitions, model_options);

    return model;
};

module.exports = CampaignStatusHistory;
