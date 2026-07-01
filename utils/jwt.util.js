const jwt = require('jsonwebtoken');
const envVarsConfig = require('../config/env_vars_config');


const ACCESS_TOKEN_EXPIRY = envVarsConfig.access_token_expiry;
const REFRESH_TOKEN_EXPIRY = envVarsConfig.refresh_token_expiry;

const TOKEN_SECRET = envVarsConfig.token_secret;

if (!TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not configured');
}

function generateAccessToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

function generateTokenPair(payload) {
    return {
        access_token: generateAccessToken(payload),
        refresh_token: generateRefreshToken(payload)
    };
}

function verifyAccessToken(token) {
    return jwt.verify(token, TOKEN_SECRET);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, TOKEN_SECRET);
}

function decodeToken(token) {
    return jwt.decode(token);
}

function isTokenExpired(token) {
    try {
        const decoded = jwt.decode(token);
        if (!decoded?.exp) return true;
        return decoded.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

function extractBearerToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    if (!authHeader.startsWith('Bearer ')) return null;
    return authHeader.split(' ')[1];
}

function verifyRequestAccessToken(req) {
    const token = extractBearerToken(req);
    if (!token) throw new Error('Authorization token missing');
    return verifyAccessToken(token);
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokenPair,
    verifyAccessToken,
    verifyRefreshToken,
    decodeToken,
    isTokenExpired,
    extractBearerToken,
    verifyRequestAccessToken
};
