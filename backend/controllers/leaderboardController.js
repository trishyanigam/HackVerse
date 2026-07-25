const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const leaderboardService = require('../services/leaderboardService');

// ===================================================
// Generate Leaderboard
// ===================================================

/**
 * @route   POST /api/v1/leaderboard/generate/:hackathonId
 * @desc    Generate/Recalculate leaderboard for a hackathon
 * @access  Private [ORGANIZER, ADMIN]
 */
const generateLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await leaderboardService.generateLeaderboard(
    req.params.hackathonId,
    req.user
  );

  return successResponse(res, 200, 'Leaderboard generated successfully', { leaderboard });
});

// ===================================================
// Publish Leaderboard
// ===================================================

/**
 * @route   PATCH /api/v1/leaderboard/publish/:hackathonId
 * @desc    Publish leaderboard to make results public to participants
 * @access  Private [ORGANIZER, ADMIN]
 */
const publishLeaderboard = asyncHandler(async (req, res) => {
  const result = await leaderboardService.publishLeaderboard(req.params.hackathonId, req.user);

  return successResponse(res, 200, result.message, {
    published: result.published,
    publishedAt: result.publishedAt,
  });
});

// ===================================================
// Get Leaderboard
// ===================================================

/**
 * @route   GET /api/v1/leaderboard/:hackathonId
 * @desc    Get hackathon leaderboard (Public if published, Organizer/Admin anytime)
 * @access  Public / Private
 */
const getLeaderboard = asyncHandler(async (req, res) => {
  const { leaderboard, pagination, isPublished } = await leaderboardService.getLeaderboard(
    req.params.hackathonId,
    req.query,
    req.user
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Leaderboard retrieved successfully',
    data: { leaderboard, isPublished },
    pagination,
  });
});

// ===================================================
// Export Leaderboard as CSV
// ===================================================

/**
 * @route   GET /api/v1/leaderboard/export/:hackathonId
 * @desc    Export leaderboard as downloadable CSV file
 * @access  Private [ORGANIZER, ADMIN]
 */
const exportLeaderboardCSV = asyncHandler(async (req, res) => {
  const csvContent = await leaderboardService.exportLeaderboardCSV(
    req.params.hackathonId,
    req.user
  );

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=leaderboard-${req.params.hackathonId}.csv`
  );

  return res.status(200).send(csvContent);
});

module.exports = {
  generateLeaderboard,
  publishLeaderboard,
  getLeaderboard,
  exportLeaderboardCSV,
};
