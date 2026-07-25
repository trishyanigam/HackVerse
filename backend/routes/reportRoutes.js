const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// =====================================================
// Reports & Analytics Routes
// =====================================================

/**
 * @route   GET /api/v1/reports/dashboard
 * @desc    Get high-level platform and organizer dashboard metrics
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/dashboard',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  reportController.getDashboardMetrics
);

/**
 * @route   GET /api/v1/reports/hackathons
 * @desc    Get hackathons analytics report
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/hackathons',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  reportController.getHackathonsReport
);

/**
 * @route   GET /api/v1/reports/users
 * @desc    Get user growth and role analytics report
 * @access  Private [ADMIN]
 */
router.get(
  '/users',
  authenticate,
  authorize('ADMIN'),
  reportController.getUsersReport
);

/**
 * @route   GET /api/v1/reports/submissions
 * @desc    Get submission status & judge evaluation analytics
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/submissions',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  reportController.getSubmissionsReport
);

/**
 * @route   GET /api/v1/reports/export
 * @desc    Export platform analytics as CSV file
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/export',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  reportController.exportReportCSV
);

module.exports = router;
