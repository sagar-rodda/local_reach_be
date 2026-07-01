'use strict';

const { v4: uuid } = require('uuid');

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert('roles', [
            { id: uuid(), role: 'SUPER_ADMIN', status: 'ACTIVE', created_date: now, updated_date: now },
            { id: uuid(), role: 'ADMIN', status: 'ACTIVE', created_date: now, updated_date: now },
            { id: uuid(), role: 'USER', status: 'ACTIVE', created_date: now, updated_date: now },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('roles', null, {});
    },
};
