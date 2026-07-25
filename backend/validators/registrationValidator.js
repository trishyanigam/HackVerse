const { body, param, query } = require('express-validator');

// ===================================================
// Create Registration Validator
// ===================================================
const validateCreateRegistration = [
  body('hackathonId')
    .notEmpty()
    .withMessage('Hackathon ID is required')
    .isMongoId()
    .withMessage('Hackathon ID must be a valid MongoDB ObjectId'),
];

// ===================================================
// Reject Registration Validator
// ===================================================
const validateRejectRegistration = [
  body('rejectionReason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Rejection reason cannot exceed 500 characters'),
];

// ===================================================
// Registration Query Validator
// ===================================================
const validateListRegistrations = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),

  query('status')
    .optional()
    .isIn(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'])
    .withMessage('Status must be one of: PENDING, APPROVED, REJECTED, CANCELLED'),
];

module.exports = {
  validateCreateRegistration,
  validateRejectRegistration,
  validateListRegistrations,
};
