const { body } = require('express-validator');

// Helper to validate score fields between 0 and 10
const scoreRule = (fieldName, label) =>
  body(fieldName)
    .notEmpty()
    .withMessage(`${label} score is required`)
    .isFloat({ min: 0, max: 10 })
    .withMessage(`${label} score must be a number between 0 and 10`);

const scoreOptionalRule = (fieldName, label) =>
  body(fieldName)
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage(`${label} score must be a number between 0 and 10`);

// ===================================================
// Create Review Validator
// ===================================================
const validateCreateReview = [
  scoreRule('innovation', 'Innovation'),
  scoreRule('technicalComplexity', 'Technical Complexity'),
  scoreRule('uiUx', 'UI/UX'),
  scoreRule('functionality', 'Functionality'),
  scoreRule('scalability', 'Scalability'),
  scoreRule('documentation', 'Documentation'),
  scoreRule('presentation', 'Presentation'),

  body('feedback')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Feedback cannot exceed 2000 characters'),
];

// ===================================================
// Update Review Validator
// ===================================================
const validateUpdateReview = [
  scoreOptionalRule('innovation', 'Innovation'),
  scoreOptionalRule('technicalComplexity', 'Technical Complexity'),
  scoreOptionalRule('uiUx', 'UI/UX'),
  scoreOptionalRule('functionality', 'Functionality'),
  scoreOptionalRule('scalability', 'Scalability'),
  scoreOptionalRule('documentation', 'Documentation'),
  scoreOptionalRule('presentation', 'Presentation'),

  body('feedback')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Feedback cannot exceed 2000 characters'),
];

module.exports = {
  validateCreateReview,
  validateUpdateReview,
};
