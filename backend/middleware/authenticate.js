const { verifyAccessToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Authentication Middleware.
 * Decodes Bearer token from headers and loads matching user profile.
 */
const authenticate = asyncHandler(async (req, res, next) => {
  let token = null;

  // Check authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.accessToken) {
    // Check cookies fallback
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(401, 'Authentication token missing. Please sign in.');
  }

  // Verify token validity
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    throw new ApiError(401, 'Access token is invalid or has expired.');
  }

  // Check user active state
  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    throw new ApiError(401, 'Session user no longer exists.');
  }

  if (user.isBlocked) {
    throw new ApiError(403, 'Your access has been blocked. Operations disabled.');
  }

  // Bind profile context to request
  req.user = user;
  next();
});

module.exports = authenticate;
