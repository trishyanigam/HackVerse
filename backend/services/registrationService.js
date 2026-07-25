const Registration = require('../models/Registration');
const Hackathon = require('../models/Hackathon');
const Team = require('../models/Team');
const ApiError = require('../utils/ApiError');

// ===================================================
// Register Participant for Hackathon
// ===================================================

/**
 * Handles participant registration for a hackathon.
 *
 * Rules:
 * 1. Hackathon must exist, not be soft-deleted, and status = PUBLISHED.
 * 2. Hackathon registrationStatus must be OPEN.
 * 3. Current time must be before registrationDeadline.
 * 4. Participant must not already be registered for this hackathon.
 * 5. Participant must not already belong to a team in this hackathon.
 * 6. Updates totalRegistrations counter on Hackathon.
 *
 * @param {string} hackathonId - Target hackathon ObjectId
 * @param {string} userId - Registering user's ObjectId
 * @returns {Promise<Object>} - Created registration record
 */
const registerForHackathon = async (hackathonId, userId) => {
  // 1. Fetch target hackathon
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // 2. Check registration open status
  if (hackathon.registrationStatus !== 'OPEN') {
    throw new ApiError(400, 'Registration is currently closed for this hackathon');
  }

  // 3. Check registration deadline
  const now = new Date();
  if (now > new Date(hackathon.registrationDeadline)) {
    throw new ApiError(400, 'Registration deadline for this hackathon has passed');
  }

  // 4. Check if already registered
  const existingRegistration = await Registration.findOne({
    participant: userId,
    hackathon: hackathonId,
    status: { $ne: 'CANCELLED' },
  });

  if (existingRegistration) {
    throw new ApiError(400, 'You are already registered for this hackathon');
  }

  // 5. Check if user belongs to any team in this hackathon
  const existingTeam = await Team.findOne({
    hackathon: hackathonId,
    members: userId,
    status: { $ne: 'DISBANDED' },
  });

  if (existingTeam) {
    throw new ApiError(400, 'You already belong to a team in this hackathon');
  }

  // 6. Create registration entry
  const registration = await Registration.create({
    participant: userId,
    hackathon: hackathonId,
    team: null,
    status: 'APPROVED', // Default auto-approve for streamlined registration flow
    registeredAt: now,
  });

  // 7. Increment hackathon totalRegistrations counter
  await Hackathon.findByIdAndUpdate(hackathonId, {
    $inc: { totalRegistrations: 1 },
  });

  return registration.populate([
    { path: 'hackathon', select: 'title slug startDate endDate theme mode bannerImage' },
    { path: 'participant', select: 'fullName email profilePicture college' },
  ]);
};

// ===================================================
// Cancel / Delete Registration
// ===================================================

/**
 * Cancels a user's registration for a hackathon.
 *
 * @param {string} registrationId - Registration record ID
 * @param {Object} requestingUser - Logged-in user from req.user
 * @returns {Promise<void>}
 */
const cancelRegistration = async (registrationId, requestingUser) => {
  const registration = await Registration.findById(registrationId);

  if (!registration) {
    throw new ApiError(404, 'Registration record not found');
  }

  // Ownership or Admin / Organizer check
  const isOwner = registration.participant.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'Access denied. You can only cancel your own registration.');
  }

  if (registration.status === 'CANCELLED') {
    throw new ApiError(400, 'Registration is already cancelled');
  }

  // Check if participant is in a team — if so, prevent cancellation until leaving team
  if (registration.team) {
    const team = await Team.findOne({ _id: registration.team, status: { $ne: 'DISBANDED' } });
    if (team && team.members.includes(registration.participant)) {
      throw new ApiError(
        400,
        'Cannot cancel registration while you are part of an active team. Leave or disband the team first.'
      );
    }
  }

  registration.status = 'CANCELLED';
  await registration.save();

  // Decrement totalRegistrations count
  await Hackathon.findByIdAndUpdate(registration.hackathon, {
    $inc: { totalRegistrations: -1 },
  });
};

// ===================================================
// Get My Registrations
// ===================================================

/**
 * Fetch registrations of the logged-in participant.
 *
 * @param {string} userId - User ObjectId
 * @param {Object} queryParams - Pagination parameters
 * @returns {Promise<Object>} - { registrations, pagination }
 */
const getMyRegistrations = async (userId, queryParams) => {
  const { page = 1, limit = 10 } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = { participant: userId, status: { $ne: 'CANCELLED' } };

  const [registrations, total] = await Promise.all([
    Registration.find(filter)
      .populate('hackathon', 'title slug startDate endDate theme mode status registrationDeadline bannerImage')
      .populate('team', 'teamName teamCode status')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Registration.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    registrations,
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
// Get Registrations for a Hackathon (Organizer / Admin)
// ===================================================

/**
 * Organizer / Admin view of all registrations for a hackathon.
 *
 * @param {string} hackathonId - Target hackathon ID
 * @param {Object} queryParams - Filtering and pagination
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Object>} - { registrations, pagination }
 */
const getHackathonRegistrations = async (hackathonId, queryParams, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Authorization check: Only creator organizer or Admin
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only hackathon organizers can view registrations.');
  }

  const { page = 1, limit = 10, status } = queryParams;
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = { hackathon: hackathonId };
  if (status && ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'].includes(status.toUpperCase())) {
    filter.status = status.toUpperCase();
  }

  const [registrations, total] = await Promise.all([
    Registration.find(filter)
      .populate('participant', 'fullName email profilePicture college branch phone')
      .populate('team', 'teamName teamCode')
      .populate('approvedBy', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Registration.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    registrations,
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
// Approve Registration (Organizer / Admin)
// ===================================================

/**
 * Approve a pending participant registration.
 *
 * @param {string} registrationId - Target registration ID
 * @param {Object} requestingUser - Approving user
 * @returns {Promise<Object>} - Updated registration
 */
const approveRegistration = async (registrationId, requestingUser) => {
  const registration = await Registration.findById(registrationId).populate('hackathon');

  if (!registration) {
    throw new ApiError(404, 'Registration record not found');
  }

  // Check organizer ownership or Admin
  if (
    requestingUser.role !== 'ADMIN' &&
    registration.hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only the hackathon organizer can approve registrations.');
  }

  if (registration.status === 'APPROVED') {
    throw new ApiError(400, 'Registration is already approved');
  }

  registration.status = 'APPROVED';
  registration.approvedBy = requestingUser._id;
  registration.approvalDate = new Date();
  registration.rejectionReason = '';

  await registration.save();

  return registration.populate('participant', 'fullName email profilePicture');
};

// ===================================================
// Reject Registration (Organizer / Admin)
// ===================================================

/**
 * Reject a participant registration with a reason.
 *
 * @param {string} registrationId - Target registration ID
 * @param {string} rejectionReason - Explanation for rejection
 * @param {Object} requestingUser - Rejecting user
 * @returns {Promise<Object>} - Updated registration
 */
const rejectRegistration = async (registrationId, rejectionReason, requestingUser) => {
  const registration = await Registration.findById(registrationId).populate('hackathon');

  if (!registration) {
    throw new ApiError(404, 'Registration record not found');
  }

  // Check organizer ownership or Admin
  if (
    requestingUser.role !== 'ADMIN' &&
    registration.hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only the hackathon organizer can reject registrations.');
  }

  if (registration.status === 'REJECTED') {
    throw new ApiError(400, 'Registration is already rejected');
  }

  registration.status = 'REJECTED';
  registration.rejectionReason = rejectionReason || 'Registration application was rejected by organizer';
  registration.approvedBy = requestingUser._id;
  registration.approvalDate = new Date();

  await registration.save();

  return registration.populate('participant', 'fullName email profilePicture');
};

module.exports = {
  registerForHackathon,
  cancelRegistration,
  getMyRegistrations,
  getHackathonRegistrations,
  approveRegistration,
  rejectRegistration,
};
