const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const certificateService = require('../services/certificateService');

// ===================================================
// Batch Generate Certificates for Hackathon
// ===================================================

/**
 * @route   POST /api/v1/certificates/generate/:hackathonId
 * @desc    Generate PDF certificates for all winners and participants
 * @access  Private [ORGANIZER, ADMIN]
 */
const generateHackathonCertificates = asyncHandler(async (req, res) => {
  const result = await certificateService.generateHackathonCertificates(
    req.params.hackathonId,
    req.user
  );

  return successResponse(res, 200, result.message, {
    generatedCount: result.generatedCount,
  });
});

// ===================================================
// Get My Certificates
// ===================================================

/**
 * @route   GET /api/v1/certificates/my
 * @desc    Get certificates issued to logged-in user
 * @access  Private [Logged-in user]
 */
const getMyCertificates = asyncHandler(async (req, res) => {
  const certificates = await certificateService.getMyCertificates(req.user._id);

  return successResponse(res, 200, 'Your certificates retrieved successfully', { certificates });
});

// ===================================================
// Download Certificate PDF
// ===================================================

/**
 * @route   GET /api/v1/certificates/download/:certificateId
 * @desc    Download certificate PDF file
 * @access  Private [Recipient, Organizer, Admin]
 */
const downloadCertificate = asyncHandler(async (req, res) => {
  const { filePath, filename } = await certificateService.getCertificateForDownload(
    req.params.certificateId,
    req.user
  );

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  return res.sendFile(filePath);
});

module.exports = {
  generateHackathonCertificates,
  getMyCertificates,
  downloadCertificate,
};
