const { DataTypes } = require('sequelize');

let tableName = "campaign_priorities";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    label: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(20),
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

const CampaignPriority = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
    };

    let model = sequelizeInstance.define('campaign_priority', column_definitions, model_options);

    return model;
};

module.exports = CampaignPriority;
