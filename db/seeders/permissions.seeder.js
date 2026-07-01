'use strict';

const { v4: uuid } = require('uuid');

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        const permissions = [
            // Dashboard
            { code: 'dashboard.view', name: 'View Dashboard', module: 'dashboard' },

            // Users
            { code: 'user.view', name: 'View Users', module: 'user' },
            { code: 'user.edit', name: 'Edit User', module: 'user' },
            { code: 'user.suspend', name: 'Suspend User', module: 'user' },

            // Admin Users
            { code: 'admin.view', name: 'View Admin Users', module: 'admin' },
            { code: 'admin.create', name: 'Create Admin User', module: 'admin' },
            { code: 'admin.edit', name: 'Edit Admin User', module: 'admin' },
            { code: 'admin.delete', name: 'Delete Admin User', module: 'admin' },

            // Analytics
            { code: 'analytics.view', name: 'View Analytics', module: 'analytics' },

            // Audit Logs
            { code: 'audit.view', name: 'View Audit Logs', module: 'audit' },
        ];

        await queryInterface.bulkInsert('permissions',
            permissions.map(p => ({ ...p, id: uuid(), created_date: now, updated_date: now }))
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('permissions', null, {});
    },
};
