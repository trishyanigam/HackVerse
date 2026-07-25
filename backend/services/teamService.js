const crypto = require('crypto');
const Team = require('../models/Team');
const Hackathon = require('../models/Hackathon');
const Registration = require('../models/Registration');
const Invitation = require('../models/Invitation');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

// ===================================================
// Code Generator Helpers
// ===================================================

/**
 * Generate unique upper-case random code.
 * Example prefix: TEAM-A8X9K2, INV-Z7L4M1
 *
 * @param {string} prefix - Code prefix
 * @returns {string} - Generated code
 */
const generateCode = (prefix = 'TEAM') => {
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${random}`;
};

/**
 * Ensures generated team code is unique across all teams.
 */
const generateUniqueTeamCode = async () => {
  let code = generateCode('TEAM');
  while (await Team.findOne({ teamCode: code })) {
    code = generateCode('TEAM');
  }
  return code;
};

/**
 * Ensures generated invite code is unique across all teams.
 */
const generateUniqueInviteCode = async () => {
  let code = generateCode('INV');
  while (await Team.findOne({ inviteCode: code })) {
    code = generateCode('INV');
  }
  return code;
};

// ===================================================
// Create Team
// ===================================================

/**
 * Create a new team for a hackathon.
 * Leader automatically becomes first member.
 *
 * @param {Object} teamData - { teamName, hackathonId, description, logo, maxMembers }
 * @param {Object} leaderUser - Logged-in user from req.user
 * @returns {Promise<Object>} - Created team document
 */
const createTeam = async (teamData, leaderUser) => {
  const { teamName, hackathonId, description = '', logo = '', maxMembers } = teamData;
  const leaderId = leaderUser._id;

  // 1. Verify Hackathon exists & active
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });
  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // 2. Check registration open status and deadline
  if (hackathon.registrationStatus !== 'OPEN') {
    throw new ApiError(400, 'Registration for this hackathon is closed');
  }
  if (new Date() > new Date(hackathon.registrationDeadline)) {
    throw new ApiError(400, 'Registration deadline for this hackathon has passed');
  }

  // 3. Ensure leader is registered for this hackathon
  let registration = await Registration.findOne({
    participant: leaderId,
    hackathon: hackathonId,
    status: { $ne: 'CANCELLED' },
  });

  if (!registration) {
    // Auto-register leader if not registered yet
    registration = await Registration.create({
      participant: leaderId,
      hackathon: hackathonId,
      status: 'APPROVED',
    });
    await Hackathon.findByIdAndUpdate(hackathonId, { $inc: { totalRegistrations: 1 } });
  }

  // 4. Ensure leader does not already belong to an active team in this hackathon
  const existingTeam = await Team.findOne({
    hackathon: hackathonId,
    members: leaderId,
    status: { $ne: 'DISBANDED' },
  });

  if (existingTeam) {
    throw new ApiError(400, 'You already belong to a team in this hackathon');
  }

  // 5. Ensure team name is unique within this hackathon
  const duplicateName = await Team.findOne({
    hackathon: hackathonId,
    teamName: { $regex: new RegExp(`^${teamName.trim()}$`, 'i') },
    status: { $ne: 'DISBANDED' },
  });

  if (duplicateName) {
    throw new ApiError(400, 'A team with this name already exists in this hackathon');
  }

  // 6. Validate & Cap maxMembers with hackathon maximumTeamSize limit
  let teamMaxMembers = parseInt(maxMembers, 10) || hackathon.maximumTeamSize;
  if (teamMaxMembers > hackathon.maximumTeamSize) {
    teamMaxMembers = hackathon.maximumTeamSize;
  }
  if (teamMaxMembers < hackathon.minimumTeamSize) {
    teamMaxMembers = hackathon.minimumTeamSize;
  }

  // 7. Generate Codes
  const teamCode = await generateUniqueTeamCode();
  const inviteCode = await generateUniqueInviteCode();

  // 8. Create Team document
  const team = await Team.create({
    teamName: teamName.trim(),
    teamCode,
    hackathon: hackathonId,
    leader: leaderId,
    members: [leaderId], // Leader is first member
    maxMembers: teamMaxMembers,
    description,
    logo,
    status: 'ACTIVE',
    inviteCode,
  });

  // 9. Update registration record link to team
  registration.team = team._id;
  await registration.save();

  // 10. Increment totalTeams on hackathon
  await Hackathon.findByIdAndUpdate(hackathonId, { $inc: { totalTeams: 1 } });

  return team.populate([
    { path: 'hackathon', select: 'title slug maximumTeamSize' },
    { path: 'leader', select: 'fullName email profilePicture' },
    { path: 'members', select: 'fullName email profilePicture college branch' },
  ]);
};

// ===================================================
// Get All Teams (Search, Filter, Pagination, Sorting)
// ===================================================

/**
 * Public/Participant/Organizer list of teams.
 *
 * @param {Object} queryParams - { page, limit, search, hackathonId, status, sort }
 * @returns {Promise<Object>} - { teams, pagination }
 */
const getAllTeams = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search,
    hackathonId,
    status,
    sort = 'newest',
  } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = { status: { $ne: 'DISBANDED' } };

  if (hackathonId) {
    filter.hackathon = hackathonId;
  }

  if (status && ['ACTIVE', 'LOCKED'].includes(status.toUpperCase())) {
    filter.status = status.toUpperCase();
  }

  if (search && search.trim()) {
    filter.$or = [
      { teamName: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } },
      { teamCode: { $regex: search.trim(), $options: 'i' } },
    ];
  }

  let sortOption = {};
  switch (sort) {
    case 'oldest':
      sortOption = { createdAt: 1 };
      break;
    case 'name':
      sortOption = { teamName: 1 };
      break;
    case 'newest':
    default:
      sortOption = { createdAt: -1 };
      break;
  }

  const [teams, total] = await Promise.all([
    Team.find(filter)
      .populate('hackathon', 'title slug mode startDate endDate')
      .populate('leader', 'fullName email profilePicture')
      .populate('members', 'fullName email profilePicture college')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Team.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    teams,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

// ===================================================
// Get My Teams
// ===================================================

/**
 * Returns teams where requesting user is leader or member.
 *
 * @param {string} userId - User ObjectId
 * @param {Object} queryParams - Pagination params
 * @returns {Promise<Object>} - { teams, pagination }
 */
const getMyTeams = async (userId, queryParams) => {
  const { page = 1, limit = 10 } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = {
    members: userId,
    status: { $ne: 'DISBANDED' },
  };

  const [teams, total] = await Promise.all([
    Team.find(filter)
      .populate('hackathon', 'title slug startDate endDate theme mode bannerImage registrationDeadline')
      .populate('leader', 'fullName email profilePicture')
      .populate('members', 'fullName email profilePicture college branch')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Team.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    teams,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

// ===================================================
// Get Team By ID or Code
// ===================================================

/**
 * Fetch a single team document by Mongo ID, teamCode, or inviteCode.
 *
 * @param {string} identifier - ObjectId / teamCode / inviteCode
 * @returns {Promise<Object>} - Team document
 */
const getTeamById = async (identifier) => {
  const mongoose = require('mongoose');
  const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

  const query = isObjectId
    ? { _id: identifier }
    : { $or: [{ teamCode: identifier.toUpperCase() }, { inviteCode: identifier.toUpperCase() }] };

  query.status = { $ne: 'DISBANDED' };

  const team = await Team.findOne(query)
    .populate('hackathon', 'title slug mode maximumTeamSize endDate registrationDeadline status')
    .populate('leader', 'fullName email profilePicture college phone')
    .populate('members', 'fullName email profilePicture college branch phone');

  if (!team) {
    throw new ApiError(404, 'Team not found');
  }

  return team;
};

// ===================================================
// Update Team Details
// ===================================================

/**
 * Update team information (Leader or Admin only).
 *
 * @param {string} teamId - Team ObjectId
 * @param {Object} updateData - { teamName, description, logo }
 * @param {Object} requestingUser - User performing update
 * @returns {Promise<Object>} - Updated team
 */
const updateTeam = async (teamId, updateData, requestingUser) => {
  const team = await Team.findOne({ _id: teamId, status: { $ne: 'DISBANDED' } });

  if (!team) {
    throw new ApiError(404, 'Team not found');
  }

  // Check leader or admin permission
  const isLeader = team.leader.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isLeader && !isAdmin) {
    throw new ApiError(403, 'Access denied. Only the team leader can update team details.');
  }

  // If teamName is changing, verify uniqueness in hackathon
  if (updateData.teamName && updateData.teamName.trim() !== team.teamName) {
    const existing = await Team.findOne({
      _id: { $ne: teamId },
      hackathon: team.hackathon,
      teamName: { $regex: new RegExp(`^${updateData.teamName.trim()}$`, 'i') },
      status: { $ne: 'DISBANDED' },
    });

    if (existing) {
      throw new ApiError(400, 'A team with this name already exists in this hackathon');
    }

    team.teamName = updateData.teamName.trim();
  }

  if (updateData.description !== undefined) team.description = updateData.description.trim();
  if (updateData.logo !== undefined) team.logo = updateData.logo;

  await team.save();

  return team.populate([
    { path: 'leader', select: 'fullName email profilePicture' },
    { path: 'members', select: 'fullName email profilePicture college' },
  ]);
};

// ===================================================
// Disband / Delete Team
// ===================================================

/**
 * Disbands a team (Leader or Admin only).
 * Clears team reference from members' registrations & updates totalTeams count.
 *
 * @param {string} teamId - Team ObjectId
 * @param {Object} requestingUser - User performing action
 * @returns {Promise<void>}
 */
const deleteTeam = async (teamId, requestingUser) => {
  const team = await Team.findOne({ _id: teamId, status: { $ne: 'DISBANDED' } });

  if (!team) {
    throw new ApiError(404, 'Team not found');
  }

  // Check leader or admin permission
  const isLeader = team.leader.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isLeader && !isAdmin) {
    throw new ApiError(403, 'Access denied. Only the team leader can disband the team.');
  }

  // Mark team as disbanded
  team.status = 'DISBANDED';
  await team.save();

  // Clear team reference from all members' registrations
  await Registration.updateMany(
    { team: teamId },
    { $set: { team: null } }
  );

  // Decrement totalTeams counter on Hackathon
  await Hackathon.findByIdAndUpdate(team.hackathon, {
    $inc: { totalTeams: -1 },
  });
};

// ===================================================
// Invite Member to Team
// ===================================================

/**
 * Sends an invitation to a user to join the team.
 *
 * @param {string} teamId - Target team ID
 * @param {string} receiverIdOrEmail - Receiver user ObjectId or Email
 * @param {Object} requestingUser - Leader sending invitation
 * @returns {Promise<Object>} - Created Invitation record
 */
const inviteMember = async (teamId, receiverIdOrEmail, requestingUser) => {
  const team = await Team.findOne({ _id: teamId, status: { $ne: 'DISBANDED' } });

  if (!team) {
    throw new ApiError(404, 'Team not found');
  }

  // Check if requesting user is leader
  if (team.leader.toString() !== requestingUser._id.toString() && requestingUser.role !== 'ADMIN') {
    throw new ApiError(403, 'Access denied. Only team leaders can send invitations.');
  }

  // Check if team is already full
  if (team.members.length >= team.maxMembers) {
    throw new ApiError(400, 'Team is already full');
  }

  // Find target receiver user
  const mongoose = require('mongoose');
  let receiverUser;
  if (mongoose.Types.ObjectId.isValid(receiverIdOrEmail)) {
    receiverUser = await User.findById(receiverIdOrEmail);
  } else {
    receiverUser = await User.findOne({ email: receiverIdOrEmail.toLowerCase().trim() });
  }

  if (!receiverUser) {
    throw new ApiError(404, 'Target user not found');
  }

  const receiverId = receiverUser._id;

  // Cannot invite oneself
  if (receiverId.toString() === requestingUser._id.toString()) {
    throw new ApiError(400, 'You cannot invite yourself');
  }

  // Check if user is already a member of this team
  if (team.members.includes(receiverId)) {
    throw new ApiError(400, 'User is already a member of this team');
  }

  // Check if receiver belongs to any active team in this hackathon
  const existingTeam = await Team.findOne({
    hackathon: team.hackathon,
    members: receiverId,
    status: { $ne: 'DISBANDED' },
  });

  if (existingTeam) {
    throw new ApiError(400, 'User is already part of another team in this hackathon');
  }

  // Check active pending invitations
  const existingInvite = await Invitation.findOne({
    team: teamId,
    receiver: receiverId,
    status: 'PENDING',
    expiresAt: { $gt: new Date() },
  });

  if (existingInvite) {
    throw new ApiError(400, 'An active invitation has already been sent to this user');
  }

  // Create Invitation with 48 hours validity
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const invitation = await Invitation.create({
    sender: requestingUser._id,
    receiver: receiverId,
    team: teamId,
    status: 'PENDING',
    expiresAt,
  });

  return invitation.populate([
    { path: 'sender', select: 'fullName email' },
    { path: 'receiver', select: 'fullName email' },
    { path: 'team', select: 'teamName teamCode' },
  ]);
};

// ===================================================
// Join Team (via Code)
// ===================================================

/**
 * Join team using teamCode or inviteCode.
 *
 * @param {string} code - teamCode or inviteCode
 * @param {Object} user - Logged-in user from req.user
 * @returns {Promise<Object>} - Joined team document
 */
const joinTeam = async (code, user) => {
  if (!code || !code.trim()) {
    throw new ApiError(400, 'Team code or invitation code is required');
  }

  const cleanCode = code.trim().toUpperCase();

  // Find team by teamCode OR inviteCode
  const team = await Team.findOne({
    $or: [{ teamCode: cleanCode }, { inviteCode: cleanCode }],
    status: 'ACTIVE',
  });

  if (!team) {
    throw new ApiError(404, 'Invalid team code or team is not active');
  }

  const hackathonId = team.hackathon;

  // Check if team is full
  if (team.members.length >= team.maxMembers) {
    throw new ApiError(400, 'Team is already full');
  }

  // Check if user is already in this team
  if (team.members.includes(user._id)) {
    throw new ApiError(400, 'You are already a member of this team');
  }

  // Check if user is in any other active team in this hackathon
  const existingTeam = await Team.findOne({
    hackathon: hackathonId,
    members: user._id,
    status: { $ne: 'DISBANDED' },
  });

  if (existingTeam) {
    throw new ApiError(400, 'You already belong to another team in this hackathon');
  }

  // Ensure user is registered for the hackathon
  let registration = await Registration.findOne({
    participant: user._id,
    hackathon: hackathonId,
    status: { $ne: 'CANCELLED' },
  });

  if (!registration) {
    // Auto-register user if not registered yet
    registration = await Registration.create({
      participant: user._id,
      hackathon: hackathonId,
      status: 'APPROVED',
    });
    await Hackathon.findByIdAndUpdate(hackathonId, { $inc: { totalRegistrations: 1 } });
  }

  // Add user to team members
  team.members.push(user._id);

  // If adding this member fills the team to capacity, set status to LOCKED optional
  if (team.members.length >= team.maxMembers) {
    team.status = 'LOCKED';
  }

  await team.save();

  // Update registration record team reference
  registration.team = team._id;
  await registration.save();

  // Update any pending invitations to ACCEPTED
  await Invitation.updateMany(
    { team: team._id, receiver: user._id, status: 'PENDING' },
    { $set: { status: 'ACCEPTED' } }
  );

  return team.populate([
    { path: 'hackathon', select: 'title slug' },
    { path: 'leader', select: 'fullName email profilePicture' },
    { path: 'members', select: 'fullName email profilePicture college branch' },
  ]);
};

// ===================================================
// Transfer Team Leadership
// ===================================================

/**
 * Transfers leadership of a team to another existing member.
 *
 * @param {string} teamId - Target team ObjectId
 * @param {string} newLeaderId - Target member ObjectId
 * @param {Object} requestingUser - Current leader performing action
 * @returns {Promise<Object>} - Updated team
 */
const transferLeadership = async (teamId, newLeaderId, requestingUser) => {
  const team = await Team.findOne({ _id: teamId, status: { $ne: 'DISBANDED' } });

  if (!team) {
    throw new ApiError(404, 'Team not found');
  }

  // Check leader or admin permission
  const isLeader = team.leader.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isLeader && !isAdmin) {
    throw new ApiError(403, 'Access denied. Only the team leader can transfer leadership.');
  }

  // Ensure newLeaderId is a current member of the team
  const isMember = team.members.some((m) => m.toString() === newLeaderId.toString());
  if (!isMember) {
    throw new ApiError(400, 'The designated user is not a member of this team');
  }

  if (team.leader.toString() === newLeaderId.toString()) {
    throw new ApiError(400, 'The designated user is already the team leader');
  }

  // Transfer leadership
  team.leader = newLeaderId;
  await team.save();

  return team.populate([
    { path: 'leader', select: 'fullName email profilePicture' },
    { path: 'members', select: 'fullName email profilePicture college branch' },
  ]);
};

// ===================================================
// Leave Team
// ===================================================

/**
 * Remove a member from a team.
 * Leader cannot leave unless leadership is transferred first.
 *
 * @param {string} teamId - Team ObjectId
 * @param {Object} requestingUser - User leaving the team
 * @returns {Promise<void>}
 */
const leaveTeam = async (teamId, requestingUser) => {
  const team = await Team.findOne({ _id: teamId, status: { $ne: 'DISBANDED' } });

  if (!team) {
    throw new ApiError(404, 'Team not found');
  }

  const userId = requestingUser._id;

  // Verify member belongs to team
  const isMember = team.members.some((m) => m.toString() === userId.toString());
  if (!isMember) {
    throw new ApiError(400, 'You are not a member of this team');
  }

  // Leader cannot leave without transferring leadership if team has other members
  const isLeader = team.leader.toString() === userId.toString();
  if (isLeader && team.members.length > 1) {
    throw new ApiError(
      400,
      'As team leader, you must transfer leadership to another member before leaving the team.'
    );
  }

  // If leader is the ONLY member, disbanding team is required
  if (isLeader && team.members.length === 1) {
    team.status = 'DISBANDED';
    await team.save();

    await Registration.findOneAndUpdate(
      { participant: userId, hackathon: team.hackathon },
      { $set: { team: null } }
    );

    await Hackathon.findByIdAndUpdate(team.hackathon, { $inc: { totalTeams: -1 } });
    return;
  }

  // Remove user from members list
  team.members = team.members.filter((m) => m.toString() !== userId.toString());

  // Unlock team status if it was locked and now has space
  if (team.status === 'LOCKED' && team.members.length < team.maxMembers) {
    team.status = 'ACTIVE';
  }

  await team.save();

  // Clear team reference from user's registration record
  await Registration.findOneAndUpdate(
    { participant: userId, hackathon: team.hackathon },
    { $set: { team: null } }
  );
};

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
