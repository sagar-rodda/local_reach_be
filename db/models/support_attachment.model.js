const { DataTypes } = require('sequelize');

let tableName = "support_attachments";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    ticket_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    comment_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    file_url: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    file_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    file_size_bytes: {
        type: DataTypes.BIGINT,
        allowNull: true
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

const SupportAttachment = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        createdAt: "created_date",
        updatedAt: false,
        deletedAt: "deleted_date",
        indexes: [
            { fields: ['ticket_id'] },
            { fields: ['comment_id'] },
        ],
    };

    let model = sequelizeInstance.define('support_attachment', column_definitions, model_options);

    return model;
};

module.exports = SupportAttachment;
