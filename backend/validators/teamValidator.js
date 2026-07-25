const { body, param, query } = require('express-validator');

// ===================================================
// Create Team Validator
// ===================================================
const validateCreateTeam = [
  body('teamName')
    .trim()
    .notEmpty()
    .withMessage('Team name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Team name must be between 2 and 100 characters'),

  body('hackathonId')
    .notEmpty()
    .withMessage('Hackathon ID is required')
    .isMongoId()
    .withMessage('Hackathon ID must be a valid MongoDB ObjectId'),

  body('maxMembers')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Max members must be an integer between 1 and 20'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('logo')
    .optional()
    .trim(),
];

// ===================================================
// Update Team Validator
// ===================================================
const validateUpdateTeam = [
  body('teamName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Team name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Team name must be between 2 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('logo')
    .optional()
    .trim(),
];

// ===================================================
// Invite Member Validator
// ===================================================
const validateInviteMember = [
  body('receiver')
    .trim()
    .notEmpty()
    .withMessage('Receiver ID or Email is required'),
];

// ===================================================
// Join Team Validator
// ===================================================
const validateJoinTeam = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Team code or invitation code is required'),
];

// ===================================================
// Transfer Leadership Validator
// ===================================================
const validateTransferLeader = [
  body('newLeaderId')
    .notEmpty()
    .withMessage('New leader ID is required')
    .isMongoId()
    .withMessage('New leader ID must be a valid MongoDB ObjectId'),
];

// ===================================================
// Query Teams List Validator
// ===================================================
const validateListTeams = [
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
    .isIn(['newest', 'oldest', 'name'])
    .withMessage('Sort must be one of: newest, oldest, name'),

  query('status')
    .optional()
    .isIn(['ACTIVE', 'LOCKED'])
    .withMessage('Status must be ACTIVE or LOCKED'),
];

module.exports = {
  validateCreateTeam,
  validateUpdateTeam,
  validateInviteMember,
  validateJoinTeam,
  validateTransferLeader,
  validateListTeams,
};
