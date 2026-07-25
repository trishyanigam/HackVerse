const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const submissionService = require('../services/submissionService');

// ===================================================
// Create Submission
// ===================================================

/**
 * @route   POST /api/v1/submissions
 * @desc    Submit a project for a hackathon (Team Leader only)
 * @access  Private [Team Leader]
 */
const createSubmission = asyncHandler(async (req, res) => {
  const submission = await submissionService.createSubmission(req.body, req.files, req.user);

  return successResponse(res, 201, 'Project submitted successfully', { submission });
});

// ===================================================
// Update Submission
// ===================================================

/**
 * @route   PATCH /api/v1/submissions/:id
 * @desc    Edit a project submission (Team Leader or Admin)
 * @access  Private [Team Leader, Admin]
 */
const updateSubmission = asyncHandler(async (req, res) => {
  const submission = await submissionService.updateSubmission(
    req.params.id,
    req.body,
    req.files,
    req.user
  );

  return successResponse(res, 200, 'Project submission updated successfully', { submission });
});

// ===================================================
// Get My Submissions
// ===================================================

/**
 * @route   GET /api/v1/submissions/my
 * @desc    Get logged-in user's team submissions
 * @access  Private [Logged-in user]
 */
const getMySubmissions = asyncHandler(async (req, res) => {
  const submissions = await submissionService.getMySubmissions(req.user._id);

  return successResponse(res, 200, 'Your submissions retrieved successfully', { submissions });
});

// ===================================================
// Get Submission by ID
// ===================================================

/**
 * @route   GET /api/v1/submissions/:id
 * @desc    Get a single project submission by ID
 * @access  Public / Private
 */
const getSubmissionById = asyncHandler(async (req, res) => {
  const submission = await submissionService.getSubmissionById(req.params.id);

  return successResponse(res, 200, 'Submission details retrieved successfully', { submission });
});

// ===================================================
// Delete / Withdraw Submission
// ===================================================

/**
 * @route   DELETE /api/v1/submissions/:id
 * @desc    Delete/Withdraw project submission (Team Leader or Admin)
 * @access  Private [Team Leader, Admin]
 */
const deleteSubmission = asyncHandler(async (req, res) => {
  await submissionService.deleteSubmission(req.params.id, req.user);

  return successResponse(res, 200, 'Submission deleted successfully', null);
});

// ===================================================
// Get Hackathon Submissions (Organizer / Admin)
// ===================================================

/**
 * @route   GET /api/v1/submissions/hackathon/:hackathonId
 * @desc    Get all submissions for a hackathon with search, filter, pagination
 * @access  Private [ORGANIZER, ADMIN]
 */
const getHackathonSubmissions = asyncHandler(async (req, res) => {
  const { submissions, pagination } = await submissionService.getHackathonSubmissions(
    req.params.hackathonId,
    req.query,
    req.user
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Hackathon submissions retrieved successfully',
    data: { submissions },
    pagination,
  });
});

module.exports = {
  createSubmission,
  updateSubmission,
  getMySubmissions,
  getSubmissionById,
  deleteSubmission,
  getHackathonSubmissions,
};
