const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const registrationService = require('../services/registrationService');

// ===================================================
// Register for Hackathon
// ===================================================

/**
 * @route   POST /api/v1/registrations
 * @desc    Register logged-in user for a hackathon
 * @access  Private [Logged-in user]
 */
const registerForHackathon = asyncHandler(async (req, res) => {
  const { hackathonId } = req.body;
  const registration = await registrationService.registerForHackathon(hackathonId, req.user._id);

  return successResponse(res, 201, 'Registered for hackathon successfully', { registration });
});

// ===================================================
// Cancel / Delete Registration
// ===================================================

/**
 * @route   DELETE /api/v1/registrations/:id
 * @desc    Cancel participant registration
 * @access  Private [Owner participant or Admin]
 */
const cancelRegistration = asyncHandler(async (req, res) => {
  await registrationService.cancelRegistration(req.params.id, req.user);

  return successResponse(res, 200, 'Registration cancelled successfully', null);
});

// ===================================================
// Get My Registrations
// ===================================================

/**
 * @route   GET /api/v1/registrations/my
 * @desc    Get current user's hackathon registrations
 * @access  Private [Logged-in user]
 */
const getMyRegistrations = asyncHandler(async (req, res) => {
  const { registrations, pagination } = await registrationService.getMyRegistrations(
    req.user._id,
    req.query
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Your registrations retrieved successfully',
    data: { registrations },
    pagination,
  });
});

// ===================================================
// Get Registrations for Hackathon (Organizer / Admin)
// ===================================================

/**
 * @route   GET /api/v1/registrations/hackathon/:hackathonId
 * @desc    Get all registrations for a specific hackathon
 * @access  Private [ORGANIZER, ADMIN]
 */
const getHackathonRegistrations = asyncHandler(async (req, res) => {
  const { registrations, pagination } = await registrationService.getHackathonRegistrations(
    req.params.hackathonId,
    req.query,
    req.user
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Hackathon registrations retrieved successfully',
    data: { registrations },
    pagination,
  });
});

// ===================================================
// Approve Registration
// ===================================================

/**
 * @route   PATCH /api/v1/registrations/:id/approve
 * @desc    Approve participant registration
 * @access  Private [ORGANIZER, ADMIN]
 */
const approveRegistration = asyncHandler(async (req, res) => {
  const registration = await registrationService.approveRegistration(req.params.id, req.user);

  return successResponse(res, 200, 'Registration approved successfully', { registration });
});

// ===================================================
// Reject Registration
// ===================================================

/**
 * @route   PATCH /api/v1/registrations/:id/reject
 * @desc    Reject participant registration
 * @access  Private [ORGANIZER, ADMIN]
 */
const rejectRegistration = asyncHandler(async (req, res) => {
  const { rejectionReason } = req.body;
  const registration = await registrationService.rejectRegistration(
    req.params.id,
    rejectionReason,
    req.user
  );

  return successResponse(res, 200, 'Registration rejected successfully', { registration });
});

module.exports = {
  registerForHackathon,
  cancelRegistration,
  getMyRegistrations,
  getHackathonRegistrations,
  approveRegistration,
  rejectRegistration,
};
