const Sequelize = require("sequelize").Sequelize;

const envVars = require("../../config/env_vars_config");

// Core auth models
const _User = require("../models/user.model");
const _AdminUser = require("../models/admin_user.model");
const _Role = require("../models/role.model");
const _UserRole = require("../models/user_role.model");
const _Permission = require("../models/permission.model");
const _RolePermission = require("../models/role_permission.model");
const _EmailOtp = require("../models/email_otp.model");
const _AuditLog = require("../models/audit_log.model");

const sequelize_instance = new Sequelize(
    envVars.db_name,
    envVars.db_user,
    envVars.db_password,
    {
        dialect: envVars.db_dialect,
        logging: process.env.DB_LOGGING === "enabled",
        host: envVars.db_host,
        port: envVars.db_port,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        dialectModule: require("mysql2"),
    }
);

// Initialise models
const UserModel = _User(sequelize_instance);
const AdminUserModel = _AdminUser(sequelize_instance);
const RoleModel = _Role(sequelize_instance);
const UserRoleModel = _UserRole(sequelize_instance);
const PermissionModel = _Permission(sequelize_instance);
const RolePermissionModel = _RolePermission(sequelize_instance);
const EmailOtpModel = _EmailOtp(sequelize_instance);
const AuditLogModel = _AuditLog(sequelize_instance);


// ── Associations ──────────────────────────────────────────────────────

// User ↔ Role (many-to-many through user_roles)
UserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    foreignKey: 'user_id',
    otherKey: 'role_id',
    as: 'roles'
});
RoleModel.belongsToMany(UserModel, {
    through: UserRoleModel,
    foreignKey: 'role_id',
    otherKey: 'user_id',
    as: 'users'
});

// AdminUser ↔ Role (many-to-many through user_roles)
AdminUserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    foreignKey: 'admin_user_id',
    otherKey: 'role_id',
    as: 'roles'
});
RoleModel.belongsToMany(AdminUserModel, {
    through: UserRoleModel,
    foreignKey: 'role_id',
    otherKey: 'admin_user_id',
    as: 'admin_users'
});

// Role ↔ Permission (many-to-many through role_permissions)
RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    foreignKey: 'role_id',
    otherKey: 'permission_id',
    as: 'permissions'
});
PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    foreignKey: 'permission_id',
    otherKey: 'role_id',
    as: 'roles'
});

// AuditLog ↔ AdminUser
AdminUserModel.hasMany(AuditLogModel, { foreignKey: 'admin_user_id', as: 'audit_logs' });
AuditLogModel.belongsTo(AdminUserModel, { foreignKey: 'admin_user_id', as: 'admin_user' });

module.exports = sequelize_instance;
