const db_ui_mapping = {
    'SUPER_ADMIN': 'Super Admin',
    'ADMIN': 'Admin',
    'USER': 'User',
};

function getUiValue(key) {
    return db_ui_mapping[key] || null;
}

function getDbValue(value) {
    for (const [k, v] of Object.entries(db_ui_mapping)) {
        if (v === value) return k;
    }
    return null;
}

function getAllDbValues() {
    return Object.keys(db_ui_mapping);
}

module.exports = { db_ui_mapping, getUiValue, getDbValue, getAllDbValues };
