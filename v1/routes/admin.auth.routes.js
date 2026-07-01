const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { authenticate } = require('../../middleware/auth.middleware');

// Public admin auth
router.post('/admin/signin', authController.adminSignIn);
router.post('/admin/forgot-password', authController.adminForgotPassword);
router.post('/admin/reset-password', authController.adminResetPassword);

// Authenticated admin password change (2-step)
router.post('/admin/change-password/initiate', authenticate, authController.adminChangePasswordRequest);
router.post('/admin/change-password/confirm', authenticate, authController.adminChangePasswordConfirm);

module.exports = router;
