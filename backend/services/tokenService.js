const crypto = require('crypto');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/**
 * Save refresh token in DB for the specific user.
 */
const saveRefreshToken = async (userId, token) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  user.refreshToken = token;
  await user.save();
};

/**
 * Remove refresh token in DB for the specific user.
 */
const clearRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
};

/**
 * Generates a crypto token for password resets.
 * Sets hashed token and expiration values on user object.
 */
const generatePasswordResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'No account found with this email address');
  }

  // Generate random token string
  const rawResetToken = crypto.randomBytes(32).toString('hex');

  // Hash reset token before saving in database
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(rawResetToken)
    .digest('hex');

  user.passwordResetToken = hashedResetToken;
  // Expires in 15 minutes
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  return rawResetToken;
};

module.exports = {
  saveRefreshToken,
  clearRefreshToken,
  generatePasswordResetToken,
};
