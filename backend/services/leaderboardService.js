const Leaderboard = require('../models/Leaderboard');
const Hackathon = require('../models/Hackathon');
const Submission = require('../models/Submission');
const Review = require('../models/Review');
const ApiError = require('../utils/ApiError');

// ===================================================
// Generate Leaderboard (Organizer / Admin)
// ===================================================

/**
 * Calculates rankings for a hackathon based on completed judge reviews.
 * Handles ties using earliest submission timestamp.
 *
 * @param {string} hackathonId - Hackathon ObjectId
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Array>} - Newly generated leaderboard entries
 */
const generateLeaderboard = async (hackathonId, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Authorization: Organizer owner or Admin
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only the hackathon organizer can generate the leaderboard.');
  }

  // Fetch all submissions for this hackathon
  const submissions = await Submission.find({ hackathon: hackathonId }).lean();

  if (submissions.length === 0) {
    throw new ApiError(400, 'No submissions found for this hackathon to generate a leaderboard.');
  }

  // For each submission, compute average score & judge count
  const scoredSubmissions = await Promise.all(
    submissions.map(async (sub) => {
      const reviews = await Review.find({
        submission: sub._id,
        status: 'COMPLETED',
      }).lean();

      const judgeCount = reviews.length;
      let averageScore = 0;

      if (judgeCount > 0) {
        const totalOverallScore = reviews.reduce((sum, r) => sum + r.overallScore, 0);
        averageScore = Number((totalOverallScore / judgeCount).toFixed(2));
      }

      return {
        submissionId: sub._id,
        teamId: sub.team,
        submittedAt: sub.submittedAt || sub.createdAt,
        averageScore,
        judgeCount,
      };
    })
  );

  // Sort logic:
  // 1. Primary: averageScore DESC (highest score first)
  // 2. Tie-breaker: submittedAt ASC (earliest submission gets higher rank)
  scoredSubmissions.sort((a, b) => {
    if (b.averageScore !== a.averageScore) {
      return b.averageScore - a.averageScore;
    }
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });

  // Preserve previous publication state if already published
  const existingPublished = await Leaderboard.findOne({ hackathon: hackathonId, published: true });
  const isPublished = Boolean(existingPublished);
  const publishedAt = existingPublished ? existingPublished.publishedAt : null;

  // Clear previous leaderboard entries for this hackathon
  await Leaderboard.deleteMany({ hackathon: hackathonId });

  // Construct new leaderboard entries with ranks (1-indexed)
  const leaderboardDocs = scoredSubmissions.map((item, index) => ({
    hackathon: hackathonId,
    rank: index + 1,
    team: item.teamId,
    submission: item.submissionId,
    averageScore: item.averageScore,
    judgeCount: item.judgeCount,
    published: isPublished,
    publishedAt,
  }));

  const createdLeaderboard = await Leaderboard.insertMany(leaderboardDocs);

  // Return populated entries
  return Leaderboard.find({ hackathon: hackathonId })
    .populate('team', 'teamName teamCode logo')
    .populate('submission', 'projectName githubRepository liveDemoUrl')
    .sort({ rank: 1 });
};

// ===================================================
// Publish Leaderboard (Organizer / Admin)
// ===================================================

/**
 * Publishes the generated leaderboard for a hackathon.
 *
 * @param {string} hackathonId - Hackathon ObjectId
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Object>} - Status result message
 */
const publishLeaderboard = async (hackathonId, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Authorization check
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only the hackathon organizer can publish the leaderboard.');
  }

  const existingEntries = await Leaderboard.countDocuments({ hackathon: hackathonId });

  if (existingEntries === 0) {
    throw new ApiError(
      400,
      'No leaderboard entries exist for this hackathon. Please generate the leaderboard first.'
    );
  }

  const now = new Date();

  await Leaderboard.updateMany(
    { hackathon: hackathonId },
    { $set: { published: true, publishedAt: now } }
  );

  // Update hackathon status to COMPLETED if not already
  hackathon.status = 'COMPLETED';
  await hackathon.save();

  return {
    published: true,
    publishedAt: now,
    message: 'Leaderboard successfully published to all participants.',
  };
};

// ===================================================
// Get Leaderboard (Public / Participant / Organizer)
// ===================================================

/**
 * Fetch leaderboard for a hackathon with search, filter, sorting, pagination.
 * Non-organizer / non-admin users can view only if published === true.
 *
 * @param {string} hackathonId - Target hackathon ID
 * @param {Object} queryParams - Search, sort, pagination
 * @param {Object} requestingUser - Authenticated or anonymous user
 * @returns {Promise<Object>} - { leaderboard, pagination, isPublished }
 */
const getLeaderboard = async (hackathonId, queryParams, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  const isOrganizer =
    requestingUser && hackathon.createdBy.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser && requestingUser.role === 'ADMIN';

  // Check if published
  const firstDoc = await Leaderboard.findOne({ hackathon: hackathonId }).lean();
  const isPublished = firstDoc ? firstDoc.published : false;

  // Non-organizer and non-admin can see only if published
  if (!isOrganizer && !isAdmin && !isPublished) {
    throw new ApiError(
      403,
      'The leaderboard for this hackathon has not been published yet.'
    );
  }

  const { page = 1, limit = 10, search, sort = 'rank' } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = { hackathon: hackathonId };

  let sortOption = {};
  switch (sort) {
    case 'lowest':
      sortOption = { averageScore: 1, rank: -1 };
      break;
    case 'highest':
    case 'rank':
    default:
      sortOption = { rank: 1 };
      break;
  }

  let [leaderboard, total] = await Promise.all([
    Leaderboard.find(filter)
      .populate('team', 'teamName teamCode logo leader members')
      .populate('submission', 'projectName githubRepository liveDemoUrl demoVideoUrl')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Leaderboard.countDocuments(filter),
  ]);

  // Client-side / In-memory search filter if search parameter passed
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    leaderboard = leaderboard.filter(
      (item) =>
        (item.team && searchRegex.test(item.team.teamName)) ||
        (item.submission && searchRegex.test(item.submission.projectName))
    );
  }

  const totalPages = Math.ceil(total / limitNum);

  return {
    leaderboard,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
    isPublished,
  };
};

// ===================================================
// Export Leaderboard as CSV
// ===================================================

/**
 * Generates CSV content string for the hackathon leaderboard.
 *
 * @param {string} hackathonId - Hackathon ObjectId
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<string>} - CSV file string content
 */
const exportLeaderboardCSV = async (hackathonId, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Authorization check
  const isOrganizer = hackathon.createdBy.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isOrganizer && !isAdmin) {
    throw new ApiError(403, 'Access denied. Only organizers or admins can export leaderboard data.');
  }

  const leaderboardEntries = await Leaderboard.find({ hackathon: hackathonId })
    .populate('team', 'teamName teamCode')
    .populate('submission', 'projectName githubRepository submittedAt')
    .sort({ rank: 1 })
    .lean();

  if (leaderboardEntries.length === 0) {
    throw new ApiError(400, 'No leaderboard records exist to export. Generate leaderboard first.');
  }

  // Build CSV string headers
  const csvRows = [];
  csvRows.push([
    'Rank',
    'Team Name',
    'Team Code',
    'Project Name',
    'Average Score',
    'Judge Count',
    'GitHub Repository',
    'Submitted At',
  ].join(','));

  // Build rows
  leaderboardEntries.forEach((entry) => {
    const rank = entry.rank;
    const teamName = `"${(entry.team?.teamName || '').replace(/"/g, '""')}"`;
    const teamCode = `"${entry.team?.teamCode || ''}"`;
    const projectName = `"${(entry.submission?.projectName || '').replace(/"/g, '""')}"`;
    const score = entry.averageScore.toFixed(2);
    const judgeCount = entry.judgeCount;
    const github = `"${entry.submission?.githubRepository || ''}"`;
    const submittedAt = entry.submission?.submittedAt
      ? new Date(entry.submission.submittedAt).toISOString()
      : '';

    csvRows.push([rank, teamName, teamCode, projectName, score, judgeCount, github, submittedAt].join(','));
  });

  return csvRows.join('\n');
};

module.exports = {
  generateLeaderboard,
  publishLeaderboard,
  getLeaderboard,
  exportLeaderboardCSV,
};
