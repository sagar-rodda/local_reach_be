const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Registration
router.post('/signup', authController.signUp);

// Email verification (post-signup)
router.post('/email/verify', authController.verifyEmail);
router.post('/email/resend-code', authController.resendOtp);

// OTP-based login: two steps
router.post('/signin', authController.signInInitiate);           // step 1: email + password → OTP sent
router.post('/signin/verify-otp', authController.signInVerifyOtp); // step 2: user_id + otp → tokens

// Password reset
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Token refresh
router.post('/token/refresh', authController.refreshToken);

module.exports = router;
