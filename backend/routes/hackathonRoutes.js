const express = require('express');
const router = express.Router();

const hackathonController = require('../controllers/hackathonController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  validateCreateHackathon,
  validateUpdateHackathon,
  validateListHackathons,
} = require('../validators/hackathonValidator');
const { uploadHackathonBanner } = require('../config/multer');

// ===================================================
// IMPORTANT: Static routes MUST be defined BEFORE
// parameterized routes to avoid Express matching
// /my as a dynamic :id segment.
// ===================================================

// =====================================================
// Private Routes — My Hackathons (Organizer)
// =====================================================

/**
 * @route   GET /api/v1/hackathons/my
 * @desc    Get all hackathons created by the logged-in organizer
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/my',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  hackathonController.getMyHackathons
);

// =====================================================
// Public Routes — Listing & Detail
// =====================================================

/**
 * @route   GET /api/v1/hackathons
 * @desc    Get paginated, filtered, sorted list of hackathons
 * @access  Public (shows only PUBLISHED + PUBLIC hackathons to guests)
 */
router.get('/', validateListHackathons, validate, hackathonController.getAllHackathons);

/**
 * @route   GET /api/v1/hackathons/:id
 * @desc    Get a single hackathon by MongoDB ID or slug
 * @access  Public (only published+public unless admin)
 */
router.get('/:id', hackathonController.getHackathonById);

// =====================================================
// Private Routes — Create
// =====================================================

/**
 * @route   POST /api/v1/hackathons
 * @desc    Create a new hackathon with optional banner image upload
 * @access  Private [ORGANIZER]
 *
 * Middleware chain:
 * 1. authenticate   — Verify JWT, attach req.user
 * 2. authorize      — Ensure role is ORGANIZER
 * 3. multer upload  — Handle optional banner image (single field: bannerImage)
 * 4. validate       — Run express-validator rules
 */
router.post(
  '/',
  authenticate,
  authorize('ORGANIZER'),
  uploadHackathonBanner.single('bannerImage'),
  validateCreateHackathon,
  validate,
  hackathonController.createHackathon
);

// =====================================================
// Private Routes — Ownership-Protected Actions
// =====================================================

/**
 * @route   PATCH /api/v1/hackathons/:id
 * @desc    Update hackathon (owner organizer or admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
router.patch(
  '/:id',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  uploadHackathonBanner.single('bannerImage'),
  validateUpdateHackathon,
  validate,
  hackathonController.updateHackathon
);

/**
 * @route   DELETE /api/v1/hackathons/:id
 * @desc    Soft delete hackathon (owner organizer or admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
router.delete(
  '/:id',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  hackathonController.deleteHackathon
);

// =====================================================
// Private Routes — Registration Control
// =====================================================

/**
 * @route   PATCH /api/v1/hackathons/:id/open-registration
 * @desc    Open hackathon registration (owner organizer or admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
router.patch(
  '/:id/open-registration',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  hackathonController.openRegistration
);

/**
 * @route   PATCH /api/v1/hackathons/:id/close-registration
 * @desc    Close hackathon registration (owner organizer or admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
router.patch(
  '/:id/close-registration',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  hackathonController.closeRegistration
);

module.exports = router;
