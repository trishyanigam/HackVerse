const Review = require('../models/Review');
const Submission = require('../models/Submission');
const Hackathon = require('../models/Hackathon');
const Leaderboard = require('../models/Leaderboard');
const ApiError = require('../utils/ApiError');

// ===================================================
// Get Submissions Assigned for Review (Judge)
// ===================================================

/**
 * Retrieves submissions available to review for hackathons where requesting user is assigned as a Judge.
 * Or if Admin/Organizer, returns all submissions.
 *
 * @param {Object} queryParams - Search, status, pagination
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Object>} - { submissions, pagination }
 */
const getAssignedSubmissions = async (queryParams, requestingUser) => {
  const { page = 1, limit = 10, hackathonId, status } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  // Find hackathons assigned to this judge (or all if admin)
  let hackathonFilter = { isDeleted: false };
  if (requestingUser.role === 'JUDGE') {
    hackathonFilter.assignedJudges = requestingUser._id;
  } else if (requestingUser.role === 'ORGANIZER') {
    hackathonFilter.createdBy = requestingUser._id;
  }

  if (hackathonId) {
    hackathonFilter._id = hackathonId;
  }

  const assignedHackathons = await Hackathon.find(hackathonFilter).select('_id');
  const hackathonIds = assignedHackathons.map((h) => h._id);

  const submissionFilter = {
    hackathon: { $in: hackathonIds },
  };

  const [submissions, total] = await Promise.all([
    Submission.find(submissionFilter)
      .populate('hackathon', 'title slug endDate status')
      .populate('team', 'teamName teamCode')
      .populate('submittedBy', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Submission.countDocuments(submissionFilter),
  ]);

  // Fetch reviews submitted by this judge for these submissions
  const submissionIds = submissions.map((s) => s._id);
  const myReviews = await Review.find({
    judge: requestingUser._id,
    submission: { $in: submissionIds },
  }).lean();

  const reviewMap = new Map();
  myReviews.forEach((r) => reviewMap.set(r.submission.toString(), r));

  // Attach review status to each submission in output
  const submissionsWithReviewState = submissions.map((s) => ({
    ...s,
    myReview: reviewMap.get(s._id.toString()) || null,
    isReviewed: reviewMap.has(s._id.toString()),
  }));

  const totalPages = Math.ceil(total / limitNum);

  return {
    submissions: submissionsWithReviewState,
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
// Create Review (Judge Only)
// ===================================================

/**
 * Creates a review for a submission.
 *
 * Rules:
 * 1. User must be assigned Judge for the hackathon (or Admin/Organizer).
 * 2. Judge can evaluate each submission only once.
 * 3. Cannot add review if leaderboard is already published.
 *
 * @param {string} submissionId - Target submission ID
 * @param {Object} reviewData - Criteria scores + feedback
 * @param {Object} requestingUser - Authenticated judge
 * @returns {Promise<Object>} - Created Review document
 */
const createReview = async (submissionId, reviewData, requestingUser) => {
  const submission = await Submission.findById(submissionId).populate('hackathon');

  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  const hackathon = submission.hackathon;

  // 1. Authorization: Verify user is an assigned judge, organizer, or admin
  const isAssignedJudge = hackathon.assignedJudges.some(
    (j) => j.toString() === requestingUser._id.toString()
  );
  const isOrganizer = hackathon.createdBy.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isAssignedJudge && !isOrganizer && !isAdmin) {
    throw new ApiError(403, 'Access denied. You are not assigned as a Judge for this hackathon.');
  }

  // 2. Check if Leaderboard is already published for this hackathon
  const publishedLeaderboard = await Leaderboard.findOne({
    hackathon: hackathon._id,
    published: true,
  });

  if (publishedLeaderboard) {
    throw new ApiError(
      400,
      'Leaderboard has already been published. New evaluations are locked.'
    );
  }

  // 3. Check for existing review by this judge for this submission
  const existingReview = await Review.findOne({
    submission: submissionId,
    judge: requestingUser._id,
  });

  if (existingReview) {
    throw new ApiError(
      400,
      'You have already evaluated this submission. Use update endpoint to edit your review.'
    );
  }

  // Calculate sum & overall score
  const {
    innovation = 0,
    technicalComplexity = 0,
    uiUx = 0,
    functionality = 0,
    scalability = 0,
    documentation = 0,
    presentation = 0,
    feedback = '',
  } = reviewData;

  const sum =
    parseFloat(innovation) +
    parseFloat(technicalComplexity) +
    parseFloat(uiUx) +
    parseFloat(functionality) +
    parseFloat(scalability) +
    parseFloat(documentation) +
    parseFloat(presentation);

  const overallScore = Number((sum / 7).toFixed(2));

  const review = await Review.create({
    submission: submissionId,
    hackathon: hackathon._id,
    judge: requestingUser._id,
    innovation: parseFloat(innovation),
    technicalComplexity: parseFloat(technicalComplexity),
    uiUx: parseFloat(uiUx),
    functionality: parseFloat(functionality),
    scalability: parseFloat(scalability),
    documentation: parseFloat(documentation),
    presentation: parseFloat(presentation),
    feedback,
    overallScore,
    status: 'COMPLETED',
    reviewedAt: new Date(),
  });

  // Update submission status to UNDER_REVIEW if currently SUBMITTED
  if (submission.status === 'SUBMITTED') {
    submission.status = 'UNDER_REVIEW';
    await submission.save();
  }

  return review.populate([
    { path: 'judge', select: 'fullName email profilePicture' },
    { path: 'submission', select: 'projectName githubRepository' },
  ]);
};

// ===================================================
// Update Review (Judge Only)
// ===================================================

/**
 * Updates an existing review.
 * Allowed only until leaderboard is published.
 *
 * @param {string} reviewId - Target review ID
 * @param {Object} updateData - Score updates
 * @param {Object} requestingUser - Authenticated judge
 * @returns {Promise<Object>} - Updated review document
 */
const updateReview = async (reviewId, updateData, requestingUser) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, 'Review not found');
  }

  // Check judge ownership or Admin
  const isOwnerJudge = review.judge.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isOwnerJudge && !isAdmin) {
    throw new ApiError(403, 'Access denied. You can only update your own review.');
  }

  // Check if Leaderboard is published for this hackathon
  const publishedLeaderboard = await Leaderboard.findOne({
    hackathon: review.hackathon,
    published: true,
  });

  if (publishedLeaderboard) {
    throw new ApiError(
      400,
      'Leaderboard has been published. Reviews can no longer be edited.'
    );
  }

  if (updateData.innovation !== undefined) review.innovation = parseFloat(updateData.innovation);
  if (updateData.technicalComplexity !== undefined)
    review.technicalComplexity = parseFloat(updateData.technicalComplexity);
  if (updateData.uiUx !== undefined) review.uiUx = parseFloat(updateData.uiUx);
  if (updateData.functionality !== undefined) review.functionality = parseFloat(updateData.functionality);
  if (updateData.scalability !== undefined) review.scalability = parseFloat(updateData.scalability);
  if (updateData.documentation !== undefined) review.documentation = parseFloat(updateData.documentation);
  if (updateData.presentation !== undefined) review.presentation = parseFloat(updateData.presentation);
  if (updateData.feedback !== undefined) review.feedback = updateData.feedback.trim();

  // Pre-save hook will recalculate overallScore
  review.reviewedAt = new Date();
  await review.save();

  return review.populate('judge', 'fullName email profilePicture');
};

// ===================================================
// Get Reviews for a Submission
// ===================================================

/**
 * Retrieves all reviews for a submission.
 * Enforces rule: Participants can view reviews ONLY after leaderboard is published.
 * Organizers, Admins, and Judges can view anytime.
 *
 * @param {string} submissionId - Submission ID
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Array>} - Reviews array
 */
const getSubmissionReviews = async (submissionId, requestingUser) => {
  const submission = await Submission.findById(submissionId).populate('hackathon');

  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  const isOrganizer = submission.hackathon.createdBy.toString() === requestingUser._id.toString();
  const isJudge = requestingUser.role === 'JUDGE' || requestingUser.role === 'ADMIN';

  // Check if leaderboard is published
  const publishedLeaderboard = await Leaderboard.findOne({
    hackathon: submission.hackathon._id,
    published: true,
  });

  // If not organizer, judge, or admin, user is a participant/guest
  if (!isOrganizer && !isJudge) {
    if (!publishedLeaderboard) {
      throw new ApiError(
        403,
        'Reviews for this submission are not available until the official leaderboard is published.'
      );
    }
  }

  const reviews = await Review.find({ submission: submissionId })
    .populate('judge', 'fullName email profilePicture college')
    .sort({ createdAt: -1 });

  return reviews;
};

module.exports = {
  getAssignedSubmissions,
  createReview,
  updateReview,
  getSubmissionReviews,
};
