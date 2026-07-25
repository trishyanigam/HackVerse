const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  validateCreateTeam,
  validateUpdateTeam,
  validateInviteMember,
  validateJoinTeam,
  validateTransferLeader,
  validateListTeams,
} = require('../validators/teamValidator');

// =====================================================
// Public / Semi-Public Team Search & Listing
// =====================================================

/**
 * @route   GET /api/v1/teams
 * @desc    Get all active teams with search, filter, pagination
 * @access  Public
 */
router.get('/', validateListTeams, validate, teamController.getAllTeams);

// =====================================================
// Static Private User Routes (MUST BE BEFORE /:id)
// =====================================================

/**
 * @route   GET /api/v1/teams/my
 * @desc    Get logged-in user's teams (as leader or member)
 * @access  Private [Logged-in user]
 */
router.get('/my', authenticate, validateListTeams, validate, teamController.getMyTeams);

/**
 * @route   POST /api/v1/teams/join
 * @desc    Join team using teamCode or inviteCode
 * @access  Private [Logged-in user]
 */
router.post('/join', authenticate, validateJoinTeam, validate, teamController.joinTeam);

// =====================================================
// Private Create Team Action
// =====================================================

/**
 * @route   POST /api/v1/teams
 * @desc    Create a new team for a hackathon
 * @access  Private [Logged-in user]
 */
router.post('/', authenticate, validateCreateTeam, validate, teamController.createTeam);

// =====================================================
// Dynamic Parameterized Routes (/:id)
// =====================================================

/**
 * @route   GET /api/v1/teams/:id
 * @desc    Get single team by ObjectId, teamCode, or inviteCode
 * @access  Public / Private
 */
router.get('/:id', teamController.getTeamById);

/**
 * @route   PATCH /api/v1/teams/:id
 * @desc    Update team info (name, description, logo)
 * @access  Private [Team Leader or Admin]
 */
router.patch(
  '/:id',
  authenticate,
  validateUpdateTeam,
  validate,
  teamController.updateTeam
);

/**
 * @route   DELETE /api/v1/teams/:id
 * @desc    Disband team
 * @access  Private [Team Leader or Admin]
 */
router.delete('/:id', authenticate, teamController.deleteTeam);

/**
 * @route   POST /api/v1/teams/:id/invite
 * @desc    Invite user to team
 * @access  Private [Team Leader]
 */
router.post(
  '/:id/invite',
  authenticate,
  validateInviteMember,
  validate,
  teamController.inviteMember
);

/**
 * @route   PATCH /api/v1/teams/:id/transfer-leader
 * @desc    Transfer team leadership to another member
 * @access  Private [Team Leader or Admin]
 */
router.patch(
  '/:id/transfer-leader',
  authenticate,
  validateTransferLeader,
  validate,
  teamController.transferLeadership
);

/**
 * @route   DELETE /api/v1/teams/:id/leave
 * @desc    Leave team
 * @access  Private [Team Member]
 */
router.delete('/:id/leave', authenticate, teamController.leaveTeam);

module.exports = router;
