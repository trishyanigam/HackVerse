const crypto = require('crypto');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { hashPassword, comparePassword } = require('../utils/password');
const generateTokens = require('../utils/generateToken');
const { verifyRefreshToken } = require('../utils/jwt');
const { saveRefreshToken, clearRefreshToken, generatePasswordResetToken } = require('./tokenService');
const logger = require('../utils/logger');

/**
 * Handle user registration flow.
 */
const register = async (userData) => {
  const { email, password, fullName, role, phone, college, branch } = userData;

  // Check duplicate
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'A user account with this email address already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Save record
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role,
    phone,
    college,
    branch,
  });

  // Generate session tokens
  const tokens = generateTokens(newUser);
  await saveRefreshToken(newUser._id, tokens.refreshToken);

  // Strip password in return
  const userResponse = newUser.toObject();
  delete userResponse.password;

  return {
    user: userResponse,
    tokens,
  };
};

/**
 * Handle user login flow.
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email address or password');
  }

  if (user.isBlocked) {
    throw new ApiError(403, 'Your account has been blocked. Please contact administration.');
  }

  // Match password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email address or password');
  }

  // Generate new tokens
  const tokens = generateTokens(user);
  await saveRefreshToken(user._id, tokens.refreshToken);

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    user: userResponse,
    tokens,
  };
};

/**
 * Handle user logout flow.
 */
const logout = async (userId) => {
  await clearRefreshToken(userId);
};

/**
 * Handle session token refresh flow.
 */
const refreshSessionToken = async (oldRefreshToken) => {
  const decoded = verifyRefreshToken(oldRefreshToken);
  if (!decoded) {
    throw new ApiError(401, 'Invalid or expired session refresh token');
  }

  const user = await User.findOne({ _id: decoded.id, refreshToken: oldRefreshToken });
  if (!user) {
    throw new ApiError(401, 'Invalid session session. Please login again.');
  }

  if (user.isBlocked) {
    throw new ApiError(403, 'Blocked user cannot refresh tokens');
  }

  // Generate fresh token pair
  const tokens = generateTokens(user);
  await saveRefreshToken(user._id, tokens.refreshToken);

  return tokens;
};

/**
 * Handle password recovery token request.
 */
const requestPasswordReset = async (email) => {
  const rawToken = await generatePasswordResetToken(email);

  // Email sending simulation
  logger.info(`[MAIL SIMULATION] Send to: ${email} -> Password reset link: http://localhost:5173/reset-password/${rawToken}`);

  return rawToken;
};

/**
 * Handle updating password with reset token.
 */
const resetPassword = async (rawToken, newPassword) => {
  // Hash token to match DB
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Password reset token is invalid or has expired');
  }

  // Save new hashed password and clear reset fields
  user.password = await hashPassword(newPassword);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  return true;
};

module.exports = {
  register,
  login,
  logout,
  refreshSessionToken,
  requestPasswordReset,
  resetPassword,
};
