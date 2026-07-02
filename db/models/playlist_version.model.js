const { DataTypes } = require('sequelize');

let tableName = "playlist_versions";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    playlist_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    version_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    snapshot: {
        type: DataTypes.JSON,
        allowNull: false
    },
    published_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: true
    }
};

const PlaylistVersion = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        createdAt: "created_date",
        updatedAt: false,
        indexes: [
            { unique: true, fields: ['playlist_id', 'version_number'] },
        ],
    };

    let model = sequelizeInstance.define('playlist_version', column_definitions, model_options);

    return model;
};

module.exports = PlaylistVersion;
