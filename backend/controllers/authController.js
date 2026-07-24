const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const authService = require('../services/authService');

// Cookie options for tokens
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { user, tokens } = await authService.register(req.body);

  // Set tokens in HTTP-only cookies
  res.cookie('accessToken', tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.cookie('refreshToken', tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return successResponse(res, 201, 'Account registered successfully', {
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
});

/**
 * @route   POST /api/v1/auth/login
 * @desc    Log in an existing user
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, tokens } = await authService.login(email, password);

  res.cookie('accessToken', tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie('refreshToken', tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return successResponse(res, 200, 'Login successful', {
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
});

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user and clear tokens
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id);

  // Clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return successResponse(res, 200, 'Logged out successfully', null);
});

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Issue new access token using refresh token
 * @access  Public
 */
const refreshToken = asyncHandler(async (req, res) => {
  // Accept token from body OR cookies
  const oldRefreshToken = req.body.refreshToken || req.cookies?.refreshToken;

  const tokens = await authService.refreshSessionToken(oldRefreshToken);

  res.cookie('accessToken', tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie('refreshToken', tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return successResponse(res, 200, 'Session refreshed successfully', {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
});

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request password reset email
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.requestPasswordReset(email);

  // Response is always success to not leak account existence
  return successResponse(
    res,
    200,
    'If an account with this email exists, a reset link has been sent.',
    null
  );
});

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password using reset token
 * @access  Public
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  await authService.resetPassword(token, newPassword);

  return successResponse(res, 200, 'Password has been reset successfully. Please log in.', null);
});

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get currently authenticated user profile
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  // req.user is set by authenticate middleware
  const user = req.user.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;

  return successResponse(res, 200, 'User profile retrieved', user);
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getMe,
};
