const express = require('express');
const router = express.Router();

const certificateController = require('../controllers/certificateController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// =====================================================
// User Certificate Routes
// =====================================================

/**
 * @route   GET /api/v1/certificates/my
 * @desc    Get logged-in user's certificates
 * @access  Private [Logged-in user]
 */
router.get(
  '/my',
  authenticate,
  certificateController.getMyCertificates
);

/**
 * @route   GET /api/v1/certificates/download/:certificateId
 * @desc    Download certificate PDF file
 * @access  Private [Recipient, Organizer, Admin]
 */
router.get(
  '/download/:certificateId',
  authenticate,
  certificateController.downloadCertificate
);

// =====================================================
// Organizer Certificate Routes
// =====================================================

/**
 * @route   POST /api/v1/certificates/generate/:hackathonId
 * @desc    Batch generate certificates for a completed hackathon
 * @access  Private [ORGANIZER, ADMIN]
 */
router.post(
  '/generate/:hackathonId',
  authenticate,
  authorize('ORGANIZER', 'ADMIN'),
  certificateController.generateHackathonCertificates
);

module.exports = router;
