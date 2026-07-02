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
		refresh_token: sequelizeConfig.models.refresh_token,
		login_history: sequelizeConfig.models.login_history,

		// Organization
		company: sequelizeConfig.models.company,
		store: sequelizeConfig.models.store,
		store_category: sequelizeConfig.models.store_category,
		store_contact: sequelizeConfig.models.store_contact,

		// Location
		country: sequelizeConfig.models.country,
		state: sequelizeConfig.models.state,
		city: sequelizeConfig.models.city,
		area: sequelizeConfig.models.area,
		store_location: sequelizeConfig.models.store_location,

		// Devices
		device_group: sequelizeConfig.models.device_group,
		device: sequelizeConfig.models.device,
		device_assignment: sequelizeConfig.models.device_assignment,
		device_heartbeat: sequelizeConfig.models.device_heartbeat,
		device_health: sequelizeConfig.models.device_health,
		device_storage: sequelizeConfig.models.device_storage,
		device_network: sequelizeConfig.models.device_network,
		device_configuration: sequelizeConfig.models.device_configuration,
		device_log: sequelizeConfig.models.device_log,
		device_command: sequelizeConfig.models.device_command,
		device_screenshot: sequelizeConfig.models.device_screenshot,

		// Advertisement & Files
		advertisement: sequelizeConfig.models.advertisement,
		media_file: sequelizeConfig.models.media_file,
		media_version: sequelizeConfig.models.media_version,
		thumbnail: sequelizeConfig.models.thumbnail,
		media_tag: sequelizeConfig.models.media_tag,
		advertisement_tag: sequelizeConfig.models.advertisement_tag,

		// Playlist
		playlist: sequelizeConfig.models.playlist,
		playlist_item: sequelizeConfig.models.playlist_item,
		playlist_version: sequelizeConfig.models.playlist_version,

		// Campaign
		campaign_priority: sequelizeConfig.models.campaign_priority,
		campaign: sequelizeConfig.models.campaign,
		campaign_playlist: sequelizeConfig.models.campaign_playlist,
		campaign_target: sequelizeConfig.models.campaign_target,
		campaign_schedule: sequelizeConfig.models.campaign_schedule,
		campaign_time_slot: sequelizeConfig.models.campaign_time_slot,
		campaign_status_history: sequelizeConfig.models.campaign_status_history,

		// Playback
		playlist_execution: sequelizeConfig.models.playlist_execution,
		advertisement_impression: sequelizeConfig.models.advertisement_impression,
		advertisement_playback_error: sequelizeConfig.models.advertisement_playback_error,
		playback_history: sequelizeConfig.models.playback_history,

		// Notifications
		notification: sequelizeConfig.models.notification,
		notification_recipient: sequelizeConfig.models.notification_recipient,
		notification_preference: sequelizeConfig.models.notification_preference,

		// Support
		support_ticket: sequelizeConfig.models.support_ticket,
		support_comment: sequelizeConfig.models.support_comment,
		support_attachment: sequelizeConfig.models.support_attachment,
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
