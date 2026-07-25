const Submission = require('../models/Submission');
const Hackathon = require('../models/Hackathon');
const Team = require('../models/Team');
const ApiError = require('../utils/ApiError');

// ===================================================
// Create Submission (Leader Only)
// ===================================================

/**
 * Creates a project submission for a team.
 *
 * Rules:
 * 1. Requesting user must be the Leader of an active team.
 * 2. Hackathon must exist, be active, and current time must be before submission deadline.
 * 3. Only ONE submission per team per hackathon.
 * 4. Presentation PDF is required for final submission.
 * 5. Increments totalSubmissions count on Hackathon.
 *
 * @param {Object} submissionData - Submission payload
 * @param {Object} files - Uploaded files object from multer
 * @param {Object} requestingUser - Logged-in user (req.user)
 * @returns {Promise<Object>} - Created submission document
 */
const createSubmission = async (submissionData, files, requestingUser) => {
  const {
    teamId,
    hackathonId,
    projectName,
    problemStatement,
    solution = '',
    description = '',
    githubRepository,
    liveDemoUrl = '',
    demoVideoUrl = '',
    techStack = [],
  } = submissionData;

  const userId = requestingUser._id;

  // 1. Verify target hackathon exists & active
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });
  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // 2. Check submission deadline
  const now = new Date();
  const deadline = hackathon.endDate || hackathon.registrationDeadline;
  if (now > new Date(deadline)) {
    throw new ApiError(400, 'Submission deadline for this hackathon has passed');
  }

  // 3. Verify Team exists and user is team Leader
  const team = await Team.findOne({
    _id: teamId,
    hackathon: hackathonId,
    status: { $ne: 'DISBANDED' },
  });

  if (!team) {
    throw new ApiError(404, 'Team not found for this hackathon');
  }

  if (team.leader.toString() !== userId.toString() && requestingUser.role !== 'ADMIN') {
    throw new ApiError(403, 'Access denied. Only the team leader can submit the project.');
  }

  // 4. Check for duplicate submission
  const existingSubmission = await Submission.findOne({ team: teamId, hackathon: hackathonId });
  if (existingSubmission) {
    throw new ApiError(
      400,
      'Your team has already submitted a project for this hackathon. Use update endpoint to edit.'
    );
  }

  // 5. Extract file paths from multer files object
  let screenshotPaths = [];
  let presentationPdfPath = '';

  if (files) {
    if (files.screenshots && files.screenshots.length > 0) {
      screenshotPaths = files.screenshots.map((f) => `uploads/submissions/${f.filename}`);
    }
    if (files.presentationPdf && files.presentationPdf.length > 0) {
      presentationPdfPath = `uploads/submissions/${files.presentationPdf[0].filename}`;
    }
  }

  // Ensure PDF is provided if required by schema / rule
  if (!presentationPdfPath && !submissionData.presentationPdf) {
    // Note: If passed via body as URL fallback
    if (submissionData.presentationPdf) {
      presentationPdfPath = submissionData.presentationPdf;
    }
  }

  // Normalize techStack array input if passed as string or JSON string
  let parsedTechStack = [];
  if (Array.isArray(techStack)) {
    parsedTechStack = techStack;
  } else if (typeof techStack === 'string') {
    try {
      parsedTechStack = JSON.parse(techStack);
    } catch (e) {
      parsedTechStack = techStack.split(',').map((item) => item.trim());
    }
  }

  // 6. Create Submission
  const submission = await Submission.create({
    team: teamId,
    hackathon: hackathonId,
    submittedBy: userId,
    projectName: projectName.trim(),
    problemStatement: problemStatement.trim(),
    solution: solution.trim(),
    description: description.trim(),
    githubRepository: githubRepository.trim(),
    liveDemoUrl: liveDemoUrl.trim(),
    demoVideoUrl: demoVideoUrl.trim(),
    techStack: parsedTechStack,
    screenshots: screenshotPaths,
    presentationPdf: presentationPdfPath,
    status: 'SUBMITTED',
    submittedAt: now,
    lastUpdated: now,
  });

  // 7. Increment hackathon totalSubmissions counter
  await Hackathon.findByIdAndUpdate(hackathonId, { $inc: { totalSubmissions: 1 } });

  return submission.populate([
    { path: 'team', select: 'teamName teamCode members' },
    { path: 'hackathon', select: 'title slug endDate' },
    { path: 'submittedBy', select: 'fullName email' },
  ]);
};

// ===================================================
// Update Submission (Leader Only)
// ===================================================

/**
 * Updates an existing project submission.
 *
 * Rules:
 * 1. Requesting user must be team Leader or Admin.
 * 2. Cannot edit after submission deadline.
 * 3. Cannot edit if status is UNDER_REVIEW, APPROVED, or REJECTED.
 *
 * @param {string} submissionId - Submission ObjectId
 * @param {Object} updateData - Updated fields
 * @param {Object} files - Uploaded files from multer
 * @param {Object} requestingUser - Logged-in user
 * @returns {Promise<Object>} - Updated submission document
 */
const updateSubmission = async (submissionId, updateData, files, requestingUser) => {
  const submission = await Submission.findById(submissionId).populate([
    { path: 'hackathon', select: 'endDate registrationDeadline' },
    { path: 'team', select: 'leader' },
  ]);

  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  // Permission check: Team leader or Admin
  const isLeader = submission.team.leader.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isLeader && !isAdmin) {
    throw new ApiError(403, 'Access denied. Only the team leader can edit this submission.');
  }

  // Check deadline
  const now = new Date();
  const deadline = submission.hackathon.endDate || submission.hackathon.registrationDeadline;
  if (now > new Date(deadline)) {
    throw new ApiError(400, 'Cannot edit submission after the hackathon submission deadline');
  }

  // Check submission status restriction
  if (['UNDER_REVIEW', 'APPROVED', 'REJECTED'].includes(submission.status)) {
    throw new ApiError(
      400,
      `Cannot edit submission while status is '${submission.status}'`
    );
  }

  // File processing
  if (files) {
    if (files.screenshots && files.screenshots.length > 0) {
      submission.screenshots = files.screenshots.map((f) => `uploads/submissions/${f.filename}`);
    }
    if (files.presentationPdf && files.presentationPdf.length > 0) {
      submission.presentationPdf = `uploads/submissions/${files.presentationPdf[0].filename}`;
    }
  }

  // Field updates
  if (updateData.projectName) submission.projectName = updateData.projectName.trim();
  if (updateData.problemStatement) submission.problemStatement = updateData.problemStatement.trim();
  if (updateData.solution !== undefined) submission.solution = updateData.solution.trim();
  if (updateData.description !== undefined) submission.description = updateData.description.trim();
  if (updateData.githubRepository) submission.githubRepository = updateData.githubRepository.trim();
  if (updateData.liveDemoUrl !== undefined) submission.liveDemoUrl = updateData.liveDemoUrl.trim();
  if (updateData.demoVideoUrl !== undefined) submission.demoVideoUrl = updateData.demoVideoUrl.trim();

  if (updateData.techStack) {
    if (Array.isArray(updateData.techStack)) {
      submission.techStack = updateData.techStack;
    } else if (typeof updateData.techStack === 'string') {
      try {
        submission.techStack = JSON.parse(updateData.techStack);
      } catch (e) {
        submission.techStack = updateData.techStack.split(',').map((item) => item.trim());
      }
    }
  }

  submission.lastUpdated = now;
  await submission.save();

  return submission.populate([
    { path: 'team', select: 'teamName teamCode members' },
    { path: 'hackathon', select: 'title slug' },
    { path: 'submittedBy', select: 'fullName email' },
  ]);
};

// ===================================================
// Get My Team Submissions
// ===================================================

/**
 * Returns submissions for teams where requesting user is leader or member.
 *
 * @param {string} userId - User ObjectId
 * @returns {Promise<Array>} - Submissions array
 */
const getMySubmissions = async (userId) => {
  // Find all teams user belongs to
  const userTeams = await Team.find({ members: userId, status: { $ne: 'DISBANDED' } }).select('_id');
  const teamIds = userTeams.map((t) => t._id);

  const submissions = await Submission.find({ team: { $in: teamIds } })
    .populate('hackathon', 'title slug endDate bannerImage')
    .populate('team', 'teamName teamCode leader members')
    .populate('submittedBy', 'fullName email')
    .sort({ createdAt: -1 });

  return submissions;
};

// ===================================================
// Get Single Submission by ID
// ===================================================

/**
 * Fetch a single submission by ID.
 *
 * @param {string} submissionId - Submission ObjectId
 * @returns {Promise<Object>} - Submission document
 */
const getSubmissionById = async (submissionId) => {
  const submission = await Submission.findById(submissionId)
    .populate('hackathon', 'title slug startDate endDate status')
    .populate({
      path: 'team',
      select: 'teamName teamCode leader members',
      populate: { path: 'members', select: 'fullName email profilePicture college' },
    })
    .populate('submittedBy', 'fullName email profilePicture');

  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  return submission;
};

// ===================================================
// Delete / Withdraw Submission
// ===================================================

/**
 * Deletes a submission (Leader or Admin).
 * Decrements totalSubmissions count on Hackathon.
 *
 * @param {string} submissionId - Submission ObjectId
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<void>}
 */
const deleteSubmission = async (submissionId, requestingUser) => {
  const submission = await Submission.findById(submissionId).populate('team', 'leader');

  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  // Check leader or admin permission
  const isLeader = submission.team.leader.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isLeader && !isAdmin) {
    throw new ApiError(403, 'Access denied. Only the team leader can delete this submission.');
  }

  await Submission.findByIdAndDelete(submissionId);

  // Decrement totalSubmissions count
  await Hackathon.findByIdAndUpdate(submission.hackathon, {
    $inc: { totalSubmissions: -1 },
  });
};

// ===================================================
// Get Hackathon Submissions (Organizer / Admin)
// ===================================================

/**
 * List all submissions for a hackathon with search, filter, sort, pagination.
 *
 * @param {string} hackathonId - Hackathon ObjectId
 * @param {Object} queryParams - Search, filter, pagination
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Object>} - { submissions, pagination }
 */
const getHackathonSubmissions = async (hackathonId, queryParams, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Authorization check: Organizer or Admin
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only hackathon organizers can view all submissions.');
  }

  const {
    page = 1,
    limit = 10,
    search,
    status,
    sort = 'latest',
  } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = { hackathon: hackathonId };

  if (status && Object.values(Submission.schema.path('status').enumValues).includes(status.toUpperCase())) {
    filter.status = status.toUpperCase();
  }

  if (search && search.trim()) {
    filter.$or = [
      { projectName: { $regex: search.trim(), $options: 'i' } },
      { techStack: { $regex: search.trim(), $options: 'i' } },
    ];
  }

  let sortOption = {};
  switch (sort) {
    case 'oldest':
      sortOption = { createdAt: 1 };
      break;
    case 'projectName':
      sortOption = { projectName: 1 };
      break;
    case 'latest':
    default:
      sortOption = { createdAt: -1 };
      break;
  }

  const [submissions, total] = await Promise.all([
    Submission.find(filter)
      .populate('team', 'teamName teamCode')
      .populate('submittedBy', 'fullName email profilePicture')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Submission.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    submissions,
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

module.exports = {
  createSubmission,
  updateSubmission,
  getMySubmissions,
  getSubmissionById,
  deleteSubmission,
  getHackathonSubmissions,
};
