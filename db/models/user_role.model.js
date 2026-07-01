const { DataTypes } = require('sequelize');

let tableName = "user_roles";

let column_definitions = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    admin_user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
};

const UserRole = (sequelizeInstance) => {
    let model_options = {
        sequelizeInstance,
        tableName: tableName,
        timestamps: true,
        updatedAt: "updated_date",
        createdAt: "created_date",
    };

    let model = sequelizeInstance.define('user_role', column_definitions, {
        ...model_options,
        validate: {
            eitherUserOrAdmin() {
                if (!this.user_id && !this.admin_user_id) {
                    throw new Error('Either user_id or admin_user_id must be provided.');
                }
                if (this.user_id && this.admin_user_id) {
                    throw new Error('Only one of user_id or admin_user_id can be set.');
                }
            }
        }
    });

    return model;
};

module.exports = UserRole;
