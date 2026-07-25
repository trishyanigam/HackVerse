const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const teamService = require('../services/teamService');

// ===================================================
// Create Team
// ===================================================

/**
 * @route   POST /api/v1/teams
 * @desc    Create a new team for a hackathon
 * @access  Private [Logged-in user]
 */
const createTeam = asyncHandler(async (req, res) => {
  const team = await teamService.createTeam(req.body, req.user);

  return successResponse(res, 201, 'Team created successfully', { team });
});

// ===================================================
// Get All Teams
// ===================================================

/**
 * @route   GET /api/v1/teams
 * @desc    Get all active teams (search, filter, pagination)
 * @access  Public / Private
 */
const getAllTeams = asyncHandler(async (req, res) => {
  const { teams, pagination } = await teamService.getAllTeams(req.query);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Teams retrieved successfully',
    data: { teams },
    pagination,
  });
});

// ===================================================
// Get My Teams
// ===================================================

/**
 * @route   GET /api/v1/teams/my
 * @desc    Get user's teams (leader or member)
 * @access  Private [Logged-in user]
 */
const getMyTeams = asyncHandler(async (req, res) => {
  const { teams, pagination } = await teamService.getMyTeams(req.user._id, req.query);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Your teams retrieved successfully',
    data: { teams },
    pagination,
  });
});

// ===================================================
// Get Team by ID / Code
// ===================================================

/**
 * @route   GET /api/v1/teams/:id
 * @desc    Get single team details by ID or code
 * @access  Public / Private
 */
const getTeamById = asyncHandler(async (req, res) => {
  const team = await teamService.getTeamById(req.params.id);

  return successResponse(res, 200, 'Team details retrieved successfully', { team });
});

// ===================================================
// Update Team Details
// ===================================================

/**
 * @route   PATCH /api/v1/teams/:id
 * @desc    Update team info (name, description, logo)
 * @access  Private [Team Leader or Admin]
 */
const updateTeam = asyncHandler(async (req, res) => {
  const team = await teamService.updateTeam(req.params.id, req.body, req.user);

  return successResponse(res, 200, 'Team updated successfully', { team });
});

// ===================================================
// Delete / Disband Team
// ===================================================

/**
 * @route   DELETE /api/v1/teams/:id
 * @desc    Disband team
 * @access  Private [Team Leader or Admin]
 */
const deleteTeam = asyncHandler(async (req, res) => {
  await teamService.deleteTeam(req.params.id, req.user);

  return successResponse(res, 200, 'Team disbanded successfully', null);
});

// ===================================================
// Invite Member
// ===================================================

/**
 * @route   POST /api/v1/teams/:id/invite
 * @desc    Invite a user to join team
 * @access  Private [Team Leader]
 */
const inviteMember = asyncHandler(async (req, res) => {
  const { receiver } = req.body;
  const invitation = await teamService.inviteMember(req.params.id, receiver, req.user);

  return successResponse(res, 201, 'Invitation sent successfully', { invitation });
});

// ===================================================
// Join Team (via Code)
// ===================================================

/**
 * @route   POST /api/v1/teams/join
 * @desc    Join a team using teamCode or inviteCode
 * @access  Private [Logged-in user]
 */
const joinTeam = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const team = await teamService.joinTeam(code, req.user);

  return successResponse(res, 200, 'Joined team successfully', { team });
});

// ===================================================
// Transfer Leadership
// ===================================================

/**
 * @route   PATCH /api/v1/teams/:id/transfer-leader
 * @desc    Transfer team leadership to another member
 * @access  Private [Team Leader or Admin]
 */
const transferLeadership = asyncHandler(async (req, res) => {
  const { newLeaderId } = req.body;
  const team = await teamService.transferLeadership(req.params.id, newLeaderId, req.user);

  return successResponse(res, 200, 'Leadership transferred successfully', { team });
});

// ===================================================
// Leave Team
// ===================================================

/**
 * @route   DELETE /api/v1/teams/:id/leave
 * @desc    Leave a team
 * @access  Private [Team Member]
 */
const leaveTeam = asyncHandler(async (req, res) => {
  await teamService.leaveTeam(req.params.id, req.user);

  return successResponse(res, 200, 'Left team successfully', null);
});

module.exports = {
  createTeam,
  getAllTeams,
  getMyTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  inviteMember,
  joinTeam,
  transferLeadership,
  leaveTeam,
};
