const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const reportService = require('../services/reportService');

// ===================================================
// Dashboard Metrics
// ===================================================

/**
 * @route   GET /api/v1/reports/dashboard
 * @desc    Get high-level platform and organizer metrics
 * @access  Private [ORGANIZER, ADMIN]
 */
const getDashboardMetrics = asyncHandler(async (req, res) => {
  const metrics = await reportService.getDashboardMetrics(req.user);

  return successResponse(res, 200, 'Dashboard metrics retrieved successfully', { metrics });
});

// ===================================================
// Hackathon Analytics
// ===================================================

/**
 * @route   GET /api/v1/reports/hackathons
 * @desc    Get hackathons status, mode, and registration analytics
 * @access  Private [ORGANIZER, ADMIN]
 */
const getHackathonsReport = asyncHandler(async (req, res) => {
  const report = await reportService.getHackathonsReport();

  return successResponse(res, 200, 'Hackathons report retrieved successfully', { report });
});

// ===================================================
// User Analytics
// ===================================================

/**
 * @route   GET /api/v1/reports/users
 * @desc    Get user growth and role analytics
 * @access  Private [ADMIN]
 */
const getUsersReport = asyncHandler(async (req, res) => {
  const report = await reportService.getUsersReport();

  return successResponse(res, 200, 'Users report retrieved successfully', { report });
});

// ===================================================
// Submission & Evaluation Analytics
// ===================================================

/**
 * @route   GET /api/v1/reports/submissions
 * @desc    Get submission status and judge evaluation analytics
 * @access  Private [ORGANIZER, ADMIN]
 */
const getSubmissionsReport = asyncHandler(async (req, res) => {
  const report = await reportService.getSubmissionsReport();

  return successResponse(res, 200, 'Submissions report retrieved successfully', { report });
});

// ===================================================
// Export Analytics CSV
// ===================================================

/**
 * @route   GET /api/v1/reports/export
 * @desc    Export platform analytics in CSV format
 * @access  Private [ORGANIZER, ADMIN]
 */
const exportReportCSV = asyncHandler(async (req, res) => {
  const csvContent = await reportService.exportReportCSV(req.query.type || 'summary');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=report-${req.query.type || 'summary'}.csv`);

  return res.status(200).send(csvContent);
});

module.exports = {
  getDashboardMetrics,
  getHackathonsReport,
  getUsersReport,
  getSubmissionsReport,
  exportReportCSV,
};
