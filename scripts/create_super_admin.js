require('dotenv').config();

const { v4: uuid } = require('uuid');
const sequelizeConfig = require('../db/setup/sequelize_config');
const passwordUtil = require('../utils/password.util');

const {
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD,
    SUPER_ADMIN_FIRST_NAME = 'Super',
    SUPER_ADMIN_LAST_NAME = 'Admin',
} = process.env;

async function run() {
    if (!SUPER_ADMIN_EMAIL) {
        console.error('Error: SUPER_ADMIN_EMAIL is required');
        process.exit(1);
    }
    if (!SUPER_ADMIN_PASSWORD) {
        console.error('Error: SUPER_ADMIN_PASSWORD is required');
        process.exit(1);
    }

    const passwordValidation = passwordUtil.validatePasswordStrength(SUPER_ADMIN_PASSWORD);
    if (!passwordValidation.isValid) {
        console.error('Error: Invalid password —', passwordValidation.errors.join(', '));
        process.exit(1);
    }

    const { admin_user: AdminUser, role: Role, user_role: UserRole } = sequelizeConfig.models;

    const existingAdmin = await AdminUser.findOne({ where: { email: SUPER_ADMIN_EMAIL } });
    if (existingAdmin) {
        console.log(`Super admin with email "${SUPER_ADMIN_EMAIL}" already exists. Skipping.`);
        process.exit(0);
    }

    const superAdminRole = await Role.findOne({ where: { role: 'SUPER_ADMIN' } });
    if (!superAdminRole) {
        console.error('Error: SUPER_ADMIN role not found. Run the roles seeder first.');
        process.exit(1);
    }

    const password_hash = await passwordUtil.hashPassword(SUPER_ADMIN_PASSWORD);
    const now = new Date();

    const t = await sequelizeConfig.transaction();
    let adminUser;
    try {
        adminUser = await AdminUser.create({
            id: uuid(),
            first_name: SUPER_ADMIN_FIRST_NAME,
            last_name: SUPER_ADMIN_LAST_NAME,
            email: SUPER_ADMIN_EMAIL,
            password_hash,
            status: 'ACTIVE',
            created_date: now,
            updated_date: now,
        }, { transaction: t });

        await UserRole.create({
            id: uuid(),
            admin_user_id: adminUser.id,
            role_id: superAdminRole.id,
            created_date: now,
            updated_date: now,
        }, { transaction: t });

        await t.commit();
    } catch (err) {
        await t.rollback();
        throw err;
    }

    console.log(`Super admin created successfully.`);
    console.log(`  Email  : ${SUPER_ADMIN_EMAIL}`);
    console.log(`  AdminID: ${adminUser.id}`);
}

run()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Unexpected error:', err.message || err);
        process.exit(1);
    });
