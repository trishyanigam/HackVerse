const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} = require('../validators/authValidator');

// =====================================================
// Public Auth Routes
// =====================================================

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRegister, validate, authController.register);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user and get tokens
 * @access  Public
 */
router.post('/login', validateLogin, validate, authController.login);

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Refresh access token using refresh token
 * @access  Public
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', validateForgotPassword, validate, authController.forgotPassword);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', validateResetPassword, validate, authController.resetPassword);

// =====================================================
// Protected Auth Routes
// =====================================================

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user and clear session
 * @access  Private
 */
router.post('/logout', authenticate, authController.logout);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current logged-in user profile
 * @access  Private
 */
router.get('/me', authenticate, authController.getMe);

module.exports = router;
