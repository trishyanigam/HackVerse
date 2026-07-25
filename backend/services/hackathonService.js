const Hackathon = require('../models/Hackathon');
const ApiError = require('../utils/ApiError');

// ===================================================
// Slug Generator Utility
// ===================================================

/**
 * Converts a title string into a URL-friendly slug.
 * Example: "My Hackathon 2025!" → "my-hackathon-2025"
 *
 * @param {string} title - Raw hackathon title
 * @returns {string} - Slugified string
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // Remove special characters
    .replace(/\s+/g, '-')       // Replace whitespace with hyphens
    .replace(/-+/g, '-');       // Collapse consecutive hyphens
};

/**
 * Ensures the generated slug is unique in the database.
 * Appends a numeric suffix if a collision is found.
 *
 * @param {string} baseSlug - Initial slug candidate
 * @param {string|null} [excludeId=null] - Exclude this document ID from collision check (for updates)
 * @returns {Promise<string>} - Unique slug
 */
const ensureUniqueSlug = async (baseSlug, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId }; // Exclude the current document during updates
    }

    const existing = await Hackathon.findOne(query);
    if (!existing) break; // Slug is unique — exit loop

    // Collision found — append incremental suffix
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// ===================================================
// Create Hackathon
// ===================================================

/**
 * Creates a new hackathon document.
 * Generates a unique slug from the title and sets createdBy to the organizer.
 *
 * @param {Object} hackathonData - Validated hackathon fields
 * @param {string} organizerId - MongoDB ObjectId of the requesting organizer
 * @returns {Promise<Object>} - Newly created hackathon document
 */
const createHackathon = async (hackathonData, organizerId) => {
  const { title } = hackathonData;

  // Auto-generate slug from title
  const baseSlug = generateSlug(title);
  const slug = await ensureUniqueSlug(baseSlug);

  const hackathon = await Hackathon.create({
    ...hackathonData,
    slug,
    createdBy: organizerId,
  });

  // Populate organizer details before returning
  return hackathon.populate('createdBy', 'fullName email profilePicture');
};

// ===================================================
// Get All Hackathons (Public Listing + Filters)
// ===================================================

/**
 * Retrieves a paginated list of hackathons.
 * Public requests see only PUBLISHED + PUBLIC hackathons.
 * Supports search, filters, sorting, and pagination.
 *
 * @param {Object} queryParams - Parsed query parameters from the request
 * @param {boolean} isAdmin - Whether the requester has admin privileges
 * @returns {Promise<Object>} - { hackathons, pagination }
 */
const getAllHackathons = async (queryParams, isAdmin = false) => {
  const {
    page = 1,
    limit = 10,
    sort = 'newest',
    search,
    theme,
    mode,
    registrationStatus,
    status,
    timeline, // 'upcoming' | 'ongoing' | 'completed'
  } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10))); // Cap at 50 per page
  const skip = (pageNum - 1) * limitNum;

  // -----------------------------------------------
  // Build Query Filter
  // -----------------------------------------------
  const filter = {
    isDeleted: false, // Always exclude soft-deleted documents
  };

  // Non-admin users only see PUBLISHED + PUBLIC hackathons
  if (!isAdmin) {
    filter.status = 'PUBLISHED';
    filter.visibility = 'PUBLIC';
  }

  // Full-text search across title, theme, description (uses MongoDB text index)
  if (search && search.trim()) {
    filter.$text = { $search: search.trim() };
  }

  // Exact filter by theme
  if (theme) {
    filter.theme = { $regex: new RegExp(theme, 'i') }; // Case-insensitive match
  }

  // Exact filter by mode (ONLINE / OFFLINE / HYBRID)
  if (mode && ['ONLINE', 'OFFLINE', 'HYBRID'].includes(mode.toUpperCase())) {
    filter.mode = mode.toUpperCase();
  }

  // Filter by registration status (OPEN / CLOSED)
  if (registrationStatus && ['OPEN', 'CLOSED'].includes(registrationStatus.toUpperCase())) {
    filter.registrationStatus = registrationStatus.toUpperCase();
  }

  // Filter by hackathon lifecycle status
  if (status && ['DRAFT', 'PUBLISHED', 'COMPLETED'].includes(status.toUpperCase())) {
    // Allow admin to filter by specific status
    if (isAdmin) filter.status = status.toUpperCase();
  }

  // Timeline-based date filtering
  const now = new Date();
  if (timeline) {
    switch (timeline.toLowerCase()) {
      case 'upcoming':
        // Start date is in the future
        filter.startDate = { $gt: now };
        break;
      case 'ongoing':
        // Started but not yet ended
        filter.startDate = { $lte: now };
        filter.endDate = { $gte: now };
        break;
      case 'completed':
        // End date has passed
        filter.endDate = { $lt: now };
        break;
      default:
        break;
    }
  }

  // -----------------------------------------------
  // Build Sort Options
  // -----------------------------------------------
  let sortOption = {};

  switch (sort) {
    case 'oldest':
      sortOption = { createdAt: 1 };
      break;
    case 'prize':
      sortOption = { 'prizePool.total': -1 }; // Highest prize pool first
      break;
    case 'deadline':
      sortOption = { registrationDeadline: 1 }; // Earliest deadline first
      break;
    case 'newest':
    default:
      sortOption = { createdAt: -1 };
      break;
  }

  // When using text search, include MongoDB text score for relevance-based sorting
  if (search && search.trim()) {
    sortOption = { score: { $meta: 'textScore' }, ...sortOption };
  }

  // -----------------------------------------------
  // Execute Query
  // -----------------------------------------------
  const [hackathons, total] = await Promise.all([
    Hackathon.find(filter, search ? { score: { $meta: 'textScore' } } : {})
      .populate('createdBy', 'fullName email profilePicture college')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Hackathon.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    hackathons,
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
// Get Single Hackathon by ID or Slug
// ===================================================

/**
 * Retrieves a single hackathon by its MongoDB ObjectId or slug.
 * Enforces visibility rules for non-admin users.
 *
 * @param {string} identifier - MongoDB ObjectId or slug string
 * @param {boolean} isAdmin - Admin bypass flag
 * @returns {Promise<Object>} - Hackathon document
 */
const getHackathonById = async (identifier, isAdmin = false) => {
  const mongoose = require('mongoose');

  // Determine if identifier is a valid ObjectId or a slug
  const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
  const query = isObjectId ? { _id: identifier } : { slug: identifier };
  query.isDeleted = false;

  const hackathon = await Hackathon.findOne(query)
    .populate('createdBy', 'fullName email profilePicture college')
    .populate('assignedJudges', 'fullName email profilePicture');

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Non-admins can only view PUBLISHED + PUBLIC hackathons
  if (!isAdmin && (hackathon.status !== 'PUBLISHED' || hackathon.visibility !== 'PUBLIC')) {
    throw new ApiError(404, 'Hackathon not found');
  }

  return hackathon;
};

// ===================================================
// Update Hackathon
// ===================================================

/**
 * Updates an existing hackathon document.
 * Ownership is verified — only the creator can edit (admins bypass).
 * Slug is regenerated if title changes.
 *
 * @param {string} hackathonId - Target hackathon ObjectId
 * @param {Object} updateData - Fields to update
 * @param {Object} requestingUser - Authenticated user object from req.user
 * @returns {Promise<Object>} - Updated hackathon document
 */
const updateHackathon = async (hackathonId, updateData, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Ownership check — admin can bypass
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. You are not the owner of this hackathon.');
  }

  // Prevent creator from being overwritten
  delete updateData.createdBy;
  delete updateData.slug; // Slug is managed automatically

  // Regenerate slug only if title has changed
  if (updateData.title && updateData.title !== hackathon.title) {
    const baseSlug = generateSlug(updateData.title);
    updateData.slug = await ensureUniqueSlug(baseSlug, hackathonId);
  }

  const updated = await Hackathon.findByIdAndUpdate(hackathonId, updateData, {
    new: true,            // Return updated document
    runValidators: true,  // Run schema validators on update
  }).populate('createdBy', 'fullName email profilePicture college');

  return updated;
};

// ===================================================
// Delete Hackathon (Soft Delete)
// ===================================================

/**
 * Soft deletes a hackathon by setting isDeleted=true and recording deletedAt.
 * Only the creator organizer or an admin can delete.
 *
 * @param {string} hackathonId - Target hackathon ObjectId
 * @param {Object} requestingUser - Authenticated user from req.user
 * @returns {Promise<void>}
 */
const deleteHackathon = async (hackathonId, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Ownership check — only creator or admin can delete
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. You can only delete hackathons you created.');
  }

  // Soft delete — retain document in DB with isDeleted flag
  hackathon.isDeleted = true;
  hackathon.deletedAt = new Date();
  await hackathon.save();
};

// ===================================================
// Open Registration
// ===================================================

/**
 * Opens registration for a hackathon.
 * Only the owner organizer can perform this action.
 *
 * @param {string} hackathonId - Target hackathon ObjectId
 * @param {Object} requestingUser - Authenticated user from req.user
 * @returns {Promise<Object>} - Updated hackathon document
 */
const openRegistration = async (hackathonId, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Only the creator organizer or admin can open registration
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only the hackathon owner can open registration.');
  }

  if (hackathon.registrationStatus === 'OPEN') {
    throw new ApiError(400, 'Registration is already open for this hackathon.');
  }

  // Registration can only be opened for PUBLISHED hackathons
  if (hackathon.status !== 'PUBLISHED') {
    throw new ApiError(400, 'Registration can only be opened for published hackathons.');
  }

  hackathon.registrationStatus = 'OPEN';
  await hackathon.save();

  return hackathon;
};

// ===================================================
// Close Registration
// ===================================================

/**
 * Closes registration for a hackathon.
 * Only the owner organizer can perform this action.
 *
 * @param {string} hackathonId - Target hackathon ObjectId
 * @param {Object} requestingUser - Authenticated user from req.user
 * @returns {Promise<Object>} - Updated hackathon document
 */
const closeRegistration = async (hackathonId, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false });

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Only the creator organizer or admin can close registration
  if (
    requestingUser.role !== 'ADMIN' &&
    hackathon.createdBy.toString() !== requestingUser._id.toString()
  ) {
    throw new ApiError(403, 'Access denied. Only the hackathon owner can close registration.');
  }

  if (hackathon.registrationStatus === 'CLOSED') {
    throw new ApiError(400, 'Registration is already closed for this hackathon.');
  }

  hackathon.registrationStatus = 'CLOSED';
  await hackathon.save();

  return hackathon;
};

// ===================================================
// Get My Hackathons (Organizer View)
// ===================================================

/**
 * Retrieves all hackathons created by the requesting organizer.
 * Includes all statuses and visibilities (not filtered like public listing).
 *
 * @param {string} organizerId - Authenticated organizer's ObjectId
 * @param {Object} queryParams - Pagination + sort params
 * @returns {Promise<Object>} - { hackathons, pagination }
 */
const getMyHackathons = async (organizerId, queryParams) => {
  const { page = 1, limit = 10, sort = 'newest' } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = {
    createdBy: organizerId,
    isDeleted: false,
  };

  const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

  const [hackathons, total] = await Promise.all([
    Hackathon.find(filter)
      .populate('createdBy', 'fullName email profilePicture')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Hackathon.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    hackathons,
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
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
  openRegistration,
  closeRegistration,
  getMyHackathons,
};
