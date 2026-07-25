const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const hackathonService = require('../services/hackathonService');
const path = require('path');

// ===================================================
// Create Hackathon
// ===================================================

/**
 * @route   POST /api/v1/hackathons
 * @desc    Create a new hackathon (Organizer only)
 * @access  Private [ORGANIZER]
 */
const createHackathon = asyncHandler(async (req, res) => {
  // Parse body fields from multipart form or JSON
  const hackathonData = { ...req.body };

  // Attach banner image path if file was uploaded via multer
  if (req.file) {
    // Normalize path to forward slashes for URL compatibility
    hackathonData.bannerImage = `uploads/hackathons/${req.file.filename}`;
  }

  const hackathon = await hackathonService.createHackathon(hackathonData, req.user._id);

  return successResponse(res, 201, 'Hackathon created successfully', { hackathon });
});

// ===================================================
// Get All Hackathons (Public Listing)
// ===================================================

/**
 * @route   GET /api/v1/hackathons
 * @desc    Get paginated list of hackathons with search, filter, sort
 * @access  Public
 */
const getAllHackathons = asyncHandler(async (req, res) => {
  // Admins can see all hackathons (any status/visibility)
  const isAdmin = req.user?.role === 'ADMIN';

  const { hackathons, pagination } = await hackathonService.getAllHackathons(req.query, isAdmin);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Hackathons retrieved successfully',
    data: { hackathons },
    pagination,
  });
});

// ===================================================
// Get My Hackathons (Organizer's Own)
// ===================================================

/**
 * @route   GET /api/v1/hackathons/my
 * @desc    Get all hackathons created by the logged-in organizer
 * @access  Private [ORGANIZER, ADMIN]
 */
const getMyHackathons = asyncHandler(async (req, res) => {
  const { hackathons, pagination } = await hackathonService.getMyHackathons(
    req.user._id,
    req.query
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Your hackathons retrieved successfully',
    data: { hackathons },
    pagination,
  });
});

// ===================================================
// Get Single Hackathon
// ===================================================

/**
 * @route   GET /api/v1/hackathons/:id
 * @desc    Get a single hackathon by ID or slug
 * @access  Public (only published+public unless admin)
 */
const getHackathonById = asyncHandler(async (req, res) => {
  const isAdmin = req.user?.role === 'ADMIN';
  const hackathon = await hackathonService.getHackathonById(req.params.id, isAdmin);

  return successResponse(res, 200, 'Hackathon retrieved successfully', { hackathon });
});

// ===================================================
// Update Hackathon
// ===================================================

/**
 * @route   PATCH /api/v1/hackathons/:id
 * @desc    Update hackathon fields (owner or admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
const updateHackathon = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };

  // Replace banner image if a new file is uploaded
  if (req.file) {
    updateData.bannerImage = `uploads/hackathons/${req.file.filename}`;
  }

  const hackathon = await hackathonService.updateHackathon(req.params.id, updateData, req.user);

  return successResponse(res, 200, 'Hackathon updated successfully', { hackathon });
});

// ===================================================
// Delete Hackathon (Soft Delete)
// ===================================================

/**
 * @route   DELETE /api/v1/hackathons/:id
 * @desc    Soft delete a hackathon (owner or admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
const deleteHackathon = asyncHandler(async (req, res) => {
  await hackathonService.deleteHackathon(req.params.id, req.user);

  return successResponse(res, 200, 'Hackathon deleted successfully', null);
});

// ===================================================
// Open Registration
// ===================================================

/**
 * @route   PATCH /api/v1/hackathons/:id/open-registration
 * @desc    Open registration for a hackathon
 * @access  Private [ORGANIZER, ADMIN]
 */
const openRegistration = asyncHandler(async (req, res) => {
  const hackathon = await hackathonService.openRegistration(req.params.id, req.user);

  return successResponse(res, 200, 'Registration opened successfully', {
    hackathonId: hackathon._id,
    registrationStatus: hackathon.registrationStatus,
  });
});

// ===================================================
// Close Registration
// ===================================================

/**
 * @route   PATCH /api/v1/hackathons/:id/close-registration
 * @desc    Close registration for a hackathon
 * @access  Private [ORGANIZER, ADMIN]
 */
const closeRegistration = asyncHandler(async (req, res) => {
  const hackathon = await hackathonService.closeRegistration(req.params.id, req.user);

  return successResponse(res, 200, 'Registration closed successfully', {
    hackathonId: hackathon._id,
    registrationStatus: hackathon.registrationStatus,
  });
});

module.exports = {
  createHackathon,
  getAllHackathons,
  getMyHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
  openRegistration,
  closeRegistration,
};
