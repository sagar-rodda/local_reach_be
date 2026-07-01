const express = require('express');

const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { authLimiter } = require('../middleware/rate-limit.middleware');

// Public routes
router.use('/auth', authLimiter, require('./routes/auth.routes'));
router.use('/auth', authLimiter, require('./routes/admin.auth.routes'));

// Authenticated routes
router.use(authenticate);

router.use('/users', require('./routes/user.routes'));
router.use('/admin', require('./routes/admin.routes'));

module.exports = router;
