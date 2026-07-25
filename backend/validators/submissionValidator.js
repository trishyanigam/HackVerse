const { body, query } = require('express-validator');

// ===================================================
// Create Submission Validator
// ===================================================
const validateCreateSubmission = [
  body('teamId')
    .notEmpty()
    .withMessage('Team ID is required')
    .isMongoId()
    .withMessage('Team ID must be a valid MongoDB ObjectId'),

  body('hackathonId')
    .notEmpty()
    .withMessage('Hackathon ID is required')
    .isMongoId()
    .withMessage('Hackathon ID must be a valid MongoDB ObjectId'),

  body('projectName')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ max: 150 })
    .withMessage('Project name cannot exceed 150 characters'),

  body('problemStatement')
    .trim()
    .notEmpty()
    .withMessage('Problem statement is required'),

  body('githubRepository')
    .trim()
    .notEmpty()
    .withMessage('GitHub repository URL is required')
    .isURL()
    .withMessage('GitHub repository URL must be a valid URL'),

  body('liveDemoUrl')
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage('Live demo URL must be a valid URL'),

  body('demoVideoUrl')
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage('Demo video URL must be a valid URL'),
];

// ===================================================
// Update Submission Validator
// ===================================================
const validateUpdateSubmission = [
  body('projectName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Project name cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Project name cannot exceed 150 characters'),

  body('problemStatement')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Problem statement cannot be empty'),

  body('githubRepository')
    .optional()
    .trim()
    .isURL()
    .withMessage('GitHub repository URL must be a valid URL'),

  body('liveDemoUrl')
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage('Live demo URL must be a valid URL'),

  body('demoVideoUrl')
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage('Demo video URL must be a valid URL'),
];

// ===================================================
// List Submissions Query Validator
// ===================================================
const validateListSubmissions = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),

  query('sort')
    .optional()
    .isIn(['latest', 'oldest', 'projectName'])
    .withMessage('Sort must be one of: latest, oldest, projectName'),

  query('status')
    .optional()
    .isIn(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'])
    .withMessage('Status must be one of: DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED'),
];

module.exports = {
  validateCreateSubmission,
  validateUpdateSubmission,
  validateListSubmissions,
};
