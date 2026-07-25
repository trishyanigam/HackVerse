const express = require('express');
const router = express.Router();

const registrationController = require('../controllers/registrationController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  validateCreateRegistration,
  validateRejectRegistration,
  validateListRegistrations,
} = require('../validators/registrationValidator');

// =====================================================
// Static & User-Specific Private Routes (MUST BE BEFORE /:id)
// =====================================================

/**
 * @route   GET /api/v1/registrations/my
 * @desc    Get current user's registrations
 * @access  Private [Logged-in user]
 */
router.get(
  '/my',
  authenticate,
  validateListRegistrations,
  validate,
  registrationController.getMyRegistrations
);

/**
 * @route   GET /api/v1/registrations/hackathon/:hackathonId
 * @desc    Get all registrations for a hackathon (Organizer / Admin)
 * @access  Private [ORGANIZER, ADMIN]
 */
router.get(
  '/hackathon/:hackathonId',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  validateListRegistrations,
  validate,
  registrationController.getHackathonRegistrations
);

// =====================================================
// General Private Registration Actions
// =====================================================

/**
 * @route   POST /api/v1/registrations
 * @desc    Register logged-in user for a hackathon
 * @access  Private [Logged-in user]
 */
router.post(
  '/',
  authenticate,
  validateCreateRegistration,
  validate,
  registrationController.registerForHackathon
);

// =====================================================
// Dynamic Parameterized Routes (/:id)
// =====================================================

/**
 * @route   DELETE /api/v1/registrations/:id
 * @desc    Cancel participant registration
 * @access  Private [Participant owner or Admin]
 */
router.delete(
  '/:id',
  authenticate,
  registrationController.cancelRegistration
);

/**
 * @route   PATCH /api/v1/registrations/:id/approve
 * @desc    Approve participant registration
 * @access  Private [ORGANIZER, ADMIN]
 */
router.patch(
  '/:id/approve',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  registrationController.approveRegistration
);

/**
 * @route   PATCH /api/v1/registrations/:id/reject
 * @desc    Reject participant registration with reason
 * @access  Private [ORGANIZER, ADMIN]
 */
router.patch(
  '/:id/reject',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  validateRejectRegistration,
  validate,
  registrationController.rejectRegistration
);

module.exports = router;
