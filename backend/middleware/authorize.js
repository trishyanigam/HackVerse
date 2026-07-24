const ApiError = require('../utils/ApiError');

/**
 * Authorization role checking middleware.
 * Usage: authorize('ADMIN', 'ORGANIZER')
 *
 * @param {...string} allowedRoles - Allowed user roles list
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Assert authenticated session user context is loaded
    if (!req.user) {
      return next(new ApiError(401, 'Authentication credentials missing'));
    }

    const hasRole = allowedRoles.includes(req.user.role);
    if (!hasRole) {
      return next(
        new ApiError(403, `Access denied. Role privilege is insufficient. Required: [${allowedRoles.join(', ')}]`)
      );
    }

    next();
  };
};

module.exports = authorize;
