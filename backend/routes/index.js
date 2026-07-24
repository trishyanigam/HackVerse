const express = require('express');
const healthRouter = require('./health');
const authRouter = require('./authRoutes');

const router = express.Router();

// =====================================================
// API v1 Route Registry
// =====================================================

// Health check endpoint
router.use('/', healthRouter);

// Authentication endpoints
router.use('/auth', authRouter);

module.exports = router;
