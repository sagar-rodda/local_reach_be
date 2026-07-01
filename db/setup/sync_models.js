require('dotenv').config();

const to = require("await-to-js").to;
const sequelizeConfig = require("./sequelize_config");

(async function syncModels() {
    // { alter: true } alters existing tables to match model changes and creates new tables
    let [err, result] = await to(sequelizeConfig.sync({ alter: true }));
    if (err) {
        console.log("err while syncing the models -------- \n ", JSON.stringify(err));
    }

    console.log("Models are synced...");
    return result;
})();
