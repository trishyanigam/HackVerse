const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

/**
 * Global centralized Error Handler middleware.
 * Formats native and custom ApiError responses.
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message, errors } = err;

  // Assign fallback server error code if none exists
  if (!statusCode) {
    statusCode = 500;
    message = message || 'Internal Server Error';
  }

  // Logs the error
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  if (statusCode === 500 && err.stack) {
    console.error(err.stack);
  }

  // Response mapping
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errors || [],
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};

module.exports = errorHandler;
