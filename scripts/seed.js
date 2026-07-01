require('dotenv').config();

const { Sequelize } = require('sequelize');
const sequelizeConfig = require('../db/setup/sequelize_config');

const SEEDERS = [
    '../db/seeders/roles.seeder',
    '../db/seeders/permissions.seeder',
];

async function run() {
    const queryInterface = sequelizeConfig.getQueryInterface();

    for (const seederPath of SEEDERS) {
        const name = seederPath.split('/').pop();
        process.stdout.write(`Running ${name}... `);
        try {
            const seeder = require(seederPath);
            await seeder.up(queryInterface, Sequelize);
            console.log('done');
        } catch (err) {
            console.log('FAILED');
            console.error(`  ${err.message}`);
            process.exit(1);
        }
    }

    console.log('\nAll seeders completed.');
}

run()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('Unexpected error:', err.message || err);
        process.exit(1);
    });
