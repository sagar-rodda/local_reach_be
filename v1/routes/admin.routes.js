const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../../middleware/auth.middleware');

router.use(requireAdmin);

// Admin sub-routes (to be wired up as features are built)
// router.use('/users', require('./admin.user.routes'));
// router.use('/audit-logs', require('./admin.audit_log.routes'));
// router.use('/dashboard', require('./admin.dashboard.routes'));

module.exports = router;
