const to = require("await-to-js").to;
const _ = require("lodash");

const sequelizeConfig = require("./setup/sequelize_config");


function safelyParseStr(ip) {
	if (_.isEmpty(ip)) {
		return ip;
	}

	if (_.isString(ip)) {
		return JSON.parse(ip);
	} else if (_.isObject(ip)) {
		return ip;
	} else if (typeof ip == "object") {
		return JSON.parse(JSON.stringify(ip));
	} else {
		return ip;
	}
}

const CommonDataLayer = (function () {
	let models_mapping = {
		// Core auth
		user: sequelizeConfig.models.user,
		admin_user: sequelizeConfig.models.admin_user,
		role: sequelizeConfig.models.role,
		user_role: sequelizeConfig.models.user_role,
		permission: sequelizeConfig.models.permission,
		role_permission: sequelizeConfig.models.role_permission,
		email_otp: sequelizeConfig.models.email_otp,
		audit_log: sequelizeConfig.models.audit_log,
	};

	async function create(model_name, json, options) {
		let [err, result] = await to(
			models_mapping[model_name].create(json, options)
		);
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		return result.dataValues;
	}

	async function get(model_name, options) {
		let [err, result] = await to(models_mapping[model_name].findOne(options));
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		result = safelyParseStr(JSON.stringify(result));
		return result;
	}

	async function getAll(model_name, options) {
		options.order = options.order || [["created_date", "DESC"]];
		let [err, result] = await to(models_mapping[model_name].findAll(options));
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		result = safelyParseStr(JSON.stringify(result));
		return result;
	}

	async function update(model_name, update_json, options) {
		let [err, result] = await to(
			models_mapping[model_name].update(update_json, options)
		);
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		return { id: update_json.id };
	}

	async function deleteRecord(model_name, options) {
		let [err, deletedRows] = await to(
			models_mapping[model_name].destroy(options)
		);
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		return deletedRows;
	}

	async function findOrCreate(model_name, options) {
		let [err, result] = await to(
			models_mapping[model_name].findOrCreate(options)
		);
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		result = safelyParseStr(JSON.stringify(result));
		return result;
	}

	async function getAndCountAll(model_name, options) {
		options.order = [["created_date", "DESC"]];
		let [err, result] = await to(
			models_mapping[model_name].findAndCountAll(options)
		);
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		result = safelyParseStr(JSON.stringify(result));
		return result;
	}

	async function count(model_name, options) {
		let [err, result] = await to(models_mapping[model_name].count(options));
		if (err) {
			let output = { hasErrors: true, errorType: "DbError" };
			output = { ...output, ...err, message: err.message };
			throw output;
		}

		return result;
	}

	return {
		create,
		get,
		getAll,
		update,
		deleteRecord,
		findOrCreate,
		getAndCountAll,
		count,
	};
})();

module.exports = CommonDataLayer;
