const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const reviewService = require('../services/reviewService');

// ===================================================
// Get Submissions Assigned to Judge
// ===================================================

/**
 * @route   GET /api/v1/reviews/assigned
 * @desc    Get submissions assigned to the logged-in judge for evaluation
 * @access  Private [JUDGE, ORGANIZER, ADMIN]
 */
const getAssignedSubmissions = asyncHandler(async (req, res) => {
  const { submissions, pagination } = await reviewService.getAssignedSubmissions(
    req.query,
    req.user
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Assigned submissions for evaluation retrieved successfully',
    data: { submissions },
    pagination,
  });
});

// ===================================================
// Submit Review for Submission
// ===================================================

/**
 * @route   POST /api/v1/reviews/:submissionId
 * @desc    Submit judge evaluation review for a project
 * @access  Private [JUDGE, ORGANIZER, ADMIN]
 */
const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(req.params.submissionId, req.body, req.user);

  return successResponse(res, 201, 'Evaluation review submitted successfully', { review });
});

// ===================================================
// Update Review
// ===================================================

/**
 * @route   PATCH /api/v1/reviews/:reviewId
 * @desc    Update existing review scores (before leaderboard published)
 * @access  Private [JUDGE, ADMIN]
 */
const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewService.updateReview(req.params.reviewId, req.body, req.user);

  return successResponse(res, 200, 'Evaluation review updated successfully', { review });
});

// ===================================================
// Get Reviews for a Submission
// ===================================================

/**
 * @route   GET /api/v1/reviews/submission/:submissionId
 * @desc    Get all reviews for a submission (Participants view after publish)
 * @access  Private
 */
const getSubmissionReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getSubmissionReviews(req.params.submissionId, req.user);

  return successResponse(res, 200, 'Submission reviews retrieved successfully', { reviews });
});

module.exports = {
  getAssignedSubmissions,
  createReview,
  updateReview,
  getSubmissionReviews,
};
