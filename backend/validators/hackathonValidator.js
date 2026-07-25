const { body, query } = require('express-validator');

// ===================================================
// Shared Date Validators
// ===================================================

/**
 * Validates that a field is a valid ISO 8601 date.
 * @param {string} field - Field name
 * @param {string} label - Human-readable label for error messages
 */
const isValidDate = (field, label) =>
  body(field)
    .notEmpty()
    .withMessage(`${label} is required`)
    .isISO8601()
    .withMessage(`${label} must be a valid date (ISO 8601 format: YYYY-MM-DD)`);

// ===================================================
// Create Hackathon Validator
// ===================================================

/**
 * Validation rules for POST /api/v1/hackathons
 * Covers all required fields and cross-field date logic.
 */
const validateCreateHackathon = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('theme')
    .trim()
    .notEmpty()
    .withMessage('Theme is required'),

  body('mode')
    .notEmpty()
    .withMessage('Mode is required')
    .isIn(['ONLINE', 'OFFLINE', 'HYBRID'])
    .withMessage('Mode must be one of: ONLINE, OFFLINE, HYBRID'),

  isValidDate('startDate', 'Start date'),
  isValidDate('endDate', 'End date'),
  isValidDate('registrationDeadline', 'Registration deadline'),

  // Cross-field: registration deadline must be before start date
  body('registrationDeadline').custom((value, { req }) => {
    if (new Date(value) >= new Date(req.body.startDate)) {
      throw new Error('Registration deadline must be before the start date');
    }
    return true;
  }),

  // Cross-field: end date must be after start date
  body('endDate').custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.startDate)) {
      throw new Error('End date must be after the start date');
    }
    return true;
  }),

  body('maximumTeamSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum team size must be at least 1'),

  body('minimumTeamSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Minimum team size must be at least 1'),

  // Ensure minimum <= maximum team size
  body('minimumTeamSize').custom((value, { req }) => {
    if (value && req.body.maximumTeamSize && parseInt(value) > parseInt(req.body.maximumTeamSize)) {
      throw new Error('Minimum team size cannot exceed maximum team size');
    }
    return true;
  }),

  body('contactEmail')
    .optional()
    .isEmail()
    .withMessage('Contact email must be a valid email address')
    .normalizeEmail(),

  body('visibility')
    .optional()
    .isIn(['PUBLIC', 'PRIVATE'])
    .withMessage('Visibility must be PUBLIC or PRIVATE'),

  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'COMPLETED'])
    .withMessage('Status must be one of: DRAFT, PUBLISHED, COMPLETED'),

  body('registrationStatus')
    .optional()
    .isIn(['OPEN', 'CLOSED'])
    .withMessage('Registration status must be OPEN or CLOSED'),

  body('prizePool.total')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Prize pool total must be a non-negative number'),

  // Rules must be an array of strings
  body('rules')
    .optional()
    .isArray()
    .withMessage('Rules must be an array'),

  body('rules.*')
    .optional()
    .isString()
    .withMessage('Each rule must be a string'),

  // FAQ validation
  body('faq')
    .optional()
    .isArray()
    .withMessage('FAQ must be an array'),

  body('faq.*.question')
    .optional()
    .notEmpty()
    .withMessage('FAQ question is required'),

  body('faq.*.answer')
    .optional()
    .notEmpty()
    .withMessage('FAQ answer is required'),

  // Judging criteria validation
  body('judgingCriteria')
    .optional()
    .isArray()
    .withMessage('Judging criteria must be an array'),

  body('judgingCriteria.*.criterion')
    .optional()
    .notEmpty()
    .withMessage('Judging criterion name is required'),

  body('judgingCriteria.*.maxScore')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max score must be at least 1'),
];

// ===================================================
// Update Hackathon Validator
// ===================================================

/**
 * Validation rules for PATCH /api/v1/hackathons/:id
 * All fields are optional but still individually validated.
 */
const validateUpdateHackathon = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),

  body('theme')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Theme cannot be empty'),

  body('mode')
    .optional()
    .isIn(['ONLINE', 'OFFLINE', 'HYBRID'])
    .withMessage('Mode must be one of: ONLINE, OFFLINE, HYBRID'),

  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),

  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),

  body('registrationDeadline')
    .optional()
    .isISO8601()
    .withMessage('Registration deadline must be a valid ISO 8601 date'),

  body('maximumTeamSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum team size must be at least 1'),

  body('contactEmail')
    .optional()
    .isEmail()
    .withMessage('Contact email must be a valid email address')
    .normalizeEmail(),

  body('visibility')
    .optional()
    .isIn(['PUBLIC', 'PRIVATE'])
    .withMessage('Visibility must be PUBLIC or PRIVATE'),

  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'COMPLETED'])
    .withMessage('Status must be one of: DRAFT, PUBLISHED, COMPLETED'),

  body('registrationStatus')
    .optional()
    .isIn(['OPEN', 'CLOSED'])
    .withMessage('Registration status must be OPEN or CLOSED'),

  body('prizePool.total')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Prize pool total must be a non-negative number'),

  body('rules')
    .optional()
    .isArray()
    .withMessage('Rules must be an array'),

  body('faq')
    .optional()
    .isArray()
    .withMessage('FAQ must be an array'),

  body('judgingCriteria')
    .optional()
    .isArray()
    .withMessage('Judging criteria must be an array'),
];

// ===================================================
// List Hackathons Query Validator
// ===================================================

/**
 * Validation rules for GET /api/v1/hackathons query parameters.
 */
const validateListHackathons = [
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
    .isIn(['newest', 'oldest', 'prize', 'deadline'])
    .withMessage('Sort must be one of: newest, oldest, prize, deadline'),

  query('mode')
    .optional()
    .isIn(['ONLINE', 'OFFLINE', 'HYBRID'])
    .withMessage('Mode must be one of: ONLINE, OFFLINE, HYBRID'),

  query('registrationStatus')
    .optional()
    .isIn(['OPEN', 'CLOSED'])
    .withMessage('Registration status must be OPEN or CLOSED'),

  query('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'COMPLETED'])
    .withMessage('Status must be one of: DRAFT, PUBLISHED, COMPLETED'),

  query('timeline')
    .optional()
    .isIn(['upcoming', 'ongoing', 'completed'])
    .withMessage('Timeline must be one of: upcoming, ongoing, completed'),
];

module.exports = {
  validateCreateHackathon,
  validateUpdateHackathon,
  validateListHackathons,
};
