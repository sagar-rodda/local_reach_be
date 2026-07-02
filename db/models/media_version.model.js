const { DataTypes } = require('sequelize');

let tableName = "media_versions";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    media_file_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    version_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    file_size_bytes: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    checksum: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    duration_seconds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    approval_status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
        defaultValue: 'PENDING'
    },
    metadata: {
        type: DataTypes.JSON,
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

const MediaVersion = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
        deletedAt: "deleted_date",
        indexes: [
            { unique: true, fields: ['media_file_id', 'version_number'] },
        ],
    };

    let model = sequelizeInstance.define('media_version', column_definitions, model_options);

    return model;
};

module.exports = MediaVersion;
