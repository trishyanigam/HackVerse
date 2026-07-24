const { signAccessToken, signRefreshToken } = require('./jwt');

/**
 * Generates both access and refresh tokens for a user.
 *
 * @param {Object} user - Mongoose User document or user object
 * @returns {Object} Access and Refresh token strings
 */
const generateTokens = (user) => {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = generateTokens;
