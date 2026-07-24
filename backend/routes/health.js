const express = require('express');
const { successResponse } = require('../utils/apiResponse');

const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Get API service health state
 * @access  Public
 */
router.get('/health', (req, res) => {
  const healthStatus = {
    status: 'UP',
    message: 'HackVerse Backend API Service is healthy and functional.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
  return successResponse(res, 200, 'Health check completed successfully', healthStatus);
});

module.exports = router;
