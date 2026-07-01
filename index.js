require('dotenv').config();

const app = require('./app');
const sequelizeConfig = require('./db/setup/sequelize_config');
const envVars = require('./config/env_vars_config');

const PORT = envVars.app_Port || 3000;

(async () => {
    try {

        await sequelizeConfig.authenticate();

        console.log('Database connected');

        await sequelizeConfig.sync();

        console.log('Models synced');

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
})();
