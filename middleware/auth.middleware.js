const jwtUtil = require('../utils/jwt.util');

function authenticate(req, res, next) {
    try {
        const user = jwtUtil.verifyRequestAccessToken(req);

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

function requireAdmin(req, res, next) {
    if (req.user?.user_type !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden'
        });
    }
    next();
}

function requireRoles(allowedRoles) {
    return function (req, res, next) {
        const userRoles = req.user?.roles ?? [];
        const hasRole = userRoles.some(r => allowedRoles.includes(r.role_name));
        if (!hasRole) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        }
        next();
    };
}

module.exports = { authenticate, requireAdmin, requireRoles };
