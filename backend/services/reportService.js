const { Parser } = require('json2csv');
const User = require('../models/User');
const Hackathon = require('../models/Hackathon');
const Registration = require('../models/Registration');
const Team = require('../models/Team');
const Submission = require('../models/Submission');
const Review = require('../models/Review');
const Certificate = require('../models/Certificate');
const AuditLog = require('../models/AuditLog');
const ApiError = require('../utils/ApiError');

// ===================================================
// Dashboard High-Level Overview Metrics
// ===================================================

/**
 * Returns platform-wide or organizer-scoped overview metrics.
 *
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Object>} - Aggregated dashboard metrics
 */
const getDashboardMetrics = async (requestingUser) => {
  const isOrganizer = requestingUser.role === 'ORGANIZER';
  const organizerFilter = isOrganizer ? { createdBy: requestingUser._id, isDeleted: false } : { isDeleted: false };

  const [
    totalUsers,
    totalHackathons,
    activeHackathons,
    totalRegistrations,
    totalTeams,
    totalSubmissions,
    completedReviews,
    certificatesGenerated,
  ] = await Promise.all([
    User.countDocuments({ isBlocked: false }),
    Hackathon.countDocuments(organizerFilter),
    Hackathon.countDocuments({ ...organizerFilter, status: 'PUBLISHED' }),
    Registration.countDocuments({ status: { $ne: 'CANCELLED' } }),
    Team.countDocuments({ status: { $ne: 'DISBANDED' } }),
    Submission.countDocuments(),
    Review.countDocuments({ status: 'COMPLETED' }),
    Certificate.countDocuments(),
  ]);

  return {
    totalUsers,
    totalHackathons,
    activeHackathons,
    totalRegistrations,
    totalTeams,
    totalSubmissions,
    completedReviews,
    certificatesGenerated,
  };
};

// ===================================================
// Hackathon Analytics Report
// ===================================================

/**
 * Returns hackathons analytics breakdown by status, mode, and month.
 */
const getHackathonsReport = async () => {
  const [byStatus, byMode, monthlyRegistrations] = await Promise.all([
    Hackathon.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Hackathon.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: '$mode', count: { $sum: 1 } } },
    ]),
    Registration.aggregate([
      { $match: { status: { $ne: 'CANCELLED' } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return {
    byStatus,
    byMode,
    monthlyRegistrations,
  };
};

// ===================================================
// User Analytics Report
// ===================================================

/**
 * Returns user metrics by role and monthly user signups.
 */
const getUsersReport = async () => {
  const [byRole, monthlySignups] = await Promise.all([
    User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return {
    byRole,
    monthlySignups,
  };
};

// ===================================================
// Submissions & Evaluation Analytics Report
// ===================================================

/**
 * Returns submission status metrics and judge activity.
 */
const getSubmissionsReport = async () => {
  const [byStatus, judgeActivity] = await Promise.all([
    Submission.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Review.aggregate([
      { $match: { status: 'COMPLETED' } },
      { $group: { _id: '$judge', reviewsCount: { $sum: 1 }, avgScoreGiven: { $avg: '$overallScore' } } },
      { $limit: 10 },
    ]),
  ]);

  return {
    byStatus,
    judgeActivity,
  };
};

// ===================================================
// Export Analytics as CSV using json2csv
// ===================================================

/**
 * Exports summary report in CSV format.
 */
const exportReportCSV = async (type = 'summary') => {
  let fields = [];
  let data = [];

  if (type === 'hackathons') {
    fields = ['_id', 'title', 'theme', 'mode', 'status', 'totalRegistrations', 'totalTeams', 'totalSubmissions', 'createdAt'];
    data = await Hackathon.find({ isDeleted: false }).select(fields.join(' ')).lean();
  } else if (type === 'submissions') {
    fields = ['_id', 'projectName', 'githubRepository', 'status', 'submittedAt'];
    data = await Submission.find().select(fields.join(' ')).lean();
  } else {
    // Default summary metrics CSV
    const metrics = await getDashboardMetrics({ role: 'ADMIN' });
    fields = ['Metric', 'Count'];
    data = Object.keys(metrics).map((key) => ({
      Metric: key,
      Count: metrics[key],
    }));
  }

  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(data);
};

module.exports = {
  getDashboardMetrics,
  getHackathonsReport,
  getUsersReport,
  getSubmissionsReport,
  exportReportCSV,
};
