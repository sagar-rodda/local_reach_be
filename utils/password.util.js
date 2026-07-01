const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

async function hashPassword(password) {
    if (!password) throw new Error('Password is required');
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) return false;
    return bcrypt.compare(plainPassword, hashedPassword);
}

function validatePasswordStrength(password) {
    const errors = [];

    if (!password) {
        errors.push('Password is required');
        return { isValid: false, errors };
    }

    if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain an uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain a lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('Password must contain a number');
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        errors.push('Password must contain a special character');
    }

    return { isValid: errors.length === 0, errors };
}

module.exports = { hashPassword, verifyPassword, validatePasswordStrength };
