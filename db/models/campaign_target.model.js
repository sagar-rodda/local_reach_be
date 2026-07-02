const { DataTypes } = require('sequelize');

let tableName = "campaign_targets";

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
    target_type: {
        type: DataTypes.ENUM('COUNTRY', 'STATE', 'CITY', 'AREA', 'STORE', 'STORE_CATEGORY', 'DEVICE_GROUP', 'DEVICE'),
        allowNull: false
    },
    target_id: {
        type: DataTypes.UUID,
        allowNull: false
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

const CampaignTarget = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        createdAt: "created_date",
        updatedAt: false,
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['campaign_id', 'target_type', 'target_id'] },
            { fields: ['target_type', 'target_id'] },
        ],
    };

    let model = sequelizeInstance.define('campaign_target', column_definitions, model_options);

    return model;
};

module.exports = CampaignTarget;
