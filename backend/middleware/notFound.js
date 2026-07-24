const ApiError = require('../utils/ApiError');

/**
 * Not Found Middleware.
 * Instantiates a 404 Error when endpoints are not matched.
 */
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Endpoint not found - ${req.originalUrl}`);
  next(error);
};

module.exports = notFound;
