const express = require('express');
const healthRouter = require('./health');
const authRouter = require('./authRoutes');
const hackathonRouter = require('./hackathonRoutes');

const router = express.Router();

// =====================================================
// API v1 Route Registry
// =====================================================

// Health check endpoint
router.use('/', healthRouter);

// Authentication endpoints
router.use('/auth', authRouter);

// Hackathon management endpoints
router.use('/hackathons', hackathonRouter);

module.exports = router;
