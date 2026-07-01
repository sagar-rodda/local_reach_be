const commonDataLayer = require('../db/common_data_layer');

const ACTIONS = {
    ADMIN_LOGIN: 'ADMIN_LOGIN',
    ADMIN_LOGOUT: 'ADMIN_LOGOUT',
    PASSWORD_RESET: 'PASSWORD_RESET',
    ADMIN_PASSWORD_CHANGED: 'ADMIN_PASSWORD_CHANGED',

    USER_SUSPENDED: 'USER_SUSPENDED',
    USER_ACTIVATED: 'USER_ACTIVATED',
};

const ENTITY_TYPES = {
    USER: 'USER',
    ADMIN_USER: 'ADMIN_USER',
};

function _getIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    return (forwarded ? forwarded.split(',')[0].trim() : req.ip) || null;
}

async function log(req, { admin_user_id, action, entity_type, entity_id, description, metadata } = {}, transaction) {
    const data = {
        admin_user_id: admin_user_id ?? req.user?.admin_id ?? null,
        action,
        entity_type,
        entity_id: entity_id ?? null,
        description: description ?? null,
        metadata: metadata ?? null,
        ip_address: _getIp(req)
    };

    if (transaction) {
        await commonDataLayer.create('audit_log', data, { transaction });
    } else {
        try {
            await commonDataLayer.create('audit_log', data);
        } catch (err) {
            console.error('[audit] Failed to write audit log:', err.message);
        }
    }
}

module.exports = { log, ACTIONS, ENTITY_TYPES };
