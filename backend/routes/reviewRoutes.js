const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  validateCreateReview,
  validateUpdateReview,
} = require('../validators/reviewValidator');

// =====================================================
// Static Routes (MUST BE BEFORE /:reviewId)
// =====================================================

/**
 * @route   GET /api/v1/reviews/assigned
 * @desc    Get submissions assigned to logged-in judge
 * @access  Private [JUDGE, ORGANIZER, ADMIN]
 */
router.get(
  '/assigned',
  authenticate,
  authorize('JUDGE', 'ORGANIZER', 'ADMIN'),
  reviewController.getAssignedSubmissions
);

/**
 * @route   GET /api/v1/reviews/submission/:submissionId
 * @desc    Get all reviews for a submission
 * @access  Private [Logged-in user]
 */
router.get(
  '/submission/:submissionId',
  authenticate,
  reviewController.getSubmissionReviews
);

// =====================================================
// Create Review
// =====================================================

/**
 * @route   POST /api/v1/reviews/:submissionId
 * @desc    Submit judge evaluation for a project
 * @access  Private [JUDGE, ORGANIZER, ADMIN]
 */
router.post(
  '/:submissionId',
  authenticate,
  authorize('JUDGE', 'ORGANIZER', 'ADMIN'),
  validateCreateReview,
  validate,
  reviewController.createReview
);

// =====================================================
// Dynamic Parameterized Route (/:reviewId)
// =====================================================

/**
 * @route   PATCH /api/v1/reviews/:reviewId
 * @desc    Edit existing review
 * @access  Private [JUDGE, ADMIN]
 */
router.patch(
  '/:reviewId',
  authenticate,
  authorize('JUDGE', 'ADMIN'),
  validateUpdateReview,
  validate,
  reviewController.updateReview
);

module.exports = router;
