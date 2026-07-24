const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Validation checker middleware.
 * Triggers errors validation list formatted under express-validator.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path || err.param]: err.msg }));

  throw new ApiError(400, 'Validation failed', extractedErrors);
};

module.exports = validate;
