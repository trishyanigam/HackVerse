const express = require('express');
const router = express.Router();

const submissionController = require('../controllers/submissionController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { uploadSubmissionFiles } = require('../middleware/uploadMiddleware');
const {
  validateCreateSubmission,
  validateUpdateSubmission,
  validateListSubmissions,
} = require('../validators/submissionValidator');

// =====================================================
// Static Private User & Organizer Routes (MUST BE BEFORE /:id)
// =====================================================

/**
 * @route   GET /api/v1/submissions/my
 * @desc    Get logged-in user's team project submissions
 * @access  Private [Logged-in user]
 */
router.get(
  '/my',
  authenticate,
  submissionController.getMySubmissions
);

/**
 * @route   GET /api/v1/submissions/hackathon/:hackathonId
 * @desc    Get all project submissions for a hackathon (Organizer / Admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/hackathon/:hackathonId',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  validateListSubmissions,
  validate,
  submissionController.getHackathonSubmissions
);

// =====================================================
// Create Submission (Leader Only)
// =====================================================

/**
 * @route   POST /api/v1/submissions
 * @desc    Submit project for a hackathon
 * @access  Private [Team Leader]
 */
router.post(
  '/',
  authenticate,
  uploadSubmissionFiles,
  validateCreateSubmission,
  validate,
  submissionController.createSubmission
);

// =====================================================
// Dynamic Parameterized Routes (/:id)
// =====================================================

/**
 * @route   GET /api/v1/submissions/:id
 * @desc    Get submission details by ID
 * @access  Public / Private
 */
router.get(
  '/:id',
  submissionController.getSubmissionById
);

/**
 * @route   PATCH /api/v1/submissions/:id
 * @desc    Update project submission details or files
 * @access  Private [Team Leader, Admin]
 */
router.patch(
  '/:id',
  authenticate,
  uploadSubmissionFiles,
  validateUpdateSubmission,
  validate,
  submissionController.updateSubmission
);

/**
 * @route   DELETE /api/v1/submissions/:id
 * @desc    Delete/Withdraw project submission
 * @access  Private [Team Leader, Admin]
 */
router.delete(
  '/:id',
  authenticate,
  submissionController.deleteSubmission
);

module.exports = router;
