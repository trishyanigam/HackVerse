const express = require('express');
const router = express.Router();

const leaderboardController = require('../controllers/leaderboardController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// =====================================================
// Organizer / Admin Action Routes (MUST BE BEFORE GET /:hackathonId)
// =====================================================

/**
 * @route   POST /api/v1/leaderboard/generate/:hackathonId
 * @desc    Generate/Recalculate leaderboard rankings
 * @access  Private [ORGANIZER, ADMIN]
 */
router.post(
  '/generate/:hackathonId',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  leaderboardController.generateLeaderboard
);

/**
 * @route   PATCH /api/v1/leaderboard/publish/:hackathonId
 * @desc    Publish leaderboard to make results public
 * @access  Private [ORGANIZER, ADMIN]
 */
router.patch(
  '/publish/:hackathonId',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  leaderboardController.publishLeaderboard
);

/**
 * @route   GET /api/v1/leaderboard/export/:hackathonId
 * @desc    Export leaderboard as CSV file
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/export/:hackathonId',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  leaderboardController.exportLeaderboardCSV
);

// =====================================================
// Public / Participant Leaderboard View Route
// =====================================================

/**
 * @route   GET /api/v1/leaderboard/:hackathonId
 * @desc    Get hackathon leaderboard (Public if published, Organizer/Admin anytime)
 * @access  Public / Private (optional auth via middleware if token supplied)
 */
router.get(
  '/:hackathonId',
  (req, res, next) => {
    // Optional authentication check: populate req.user if bearer token present
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authenticate(req, res, next);
    }
    next();
  },
  leaderboardController.getLeaderboard
);

module.exports = router;
