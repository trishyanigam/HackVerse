/**
 * Send a standardized success API response.
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Feedback message
 * @param {Object|Array} [data=null] - Payload content
 */
const successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

/**
 * Send a standardized error API response.
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Feedback error message
 * @param {Array} [errors=[]] - Array details
 */
const errorResponse = (res, statusCode = 500, message = 'Internal Server Error', errors = []) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
