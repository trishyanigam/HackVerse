const express = require('express');
const healthRouter = require('./health');
const authRouter = require('./authRoutes');
const hackathonRouter = require('./hackathonRoutes');
const registrationRouter = require('./registrationRoutes');
const teamRouter = require('./teamRoutes');

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

// Registration management endpoints
router.use('/registrations', registrationRouter);

// Team management endpoints
router.use('/teams', teamRouter);

module.exports = router;
