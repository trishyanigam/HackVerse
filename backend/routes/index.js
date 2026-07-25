const express = require('express');
const healthRouter = require('./health');
const authRouter = require('./authRoutes');
const hackathonRouter = require('./hackathonRoutes');
const registrationRouter = require('./registrationRoutes');
const teamRouter = require('./teamRoutes');
const submissionRouter = require('./submissionRoutes');
const reviewRouter = require('./reviewRoutes');
const leaderboardRouter = require('./leaderboardRoutes');
const notificationRouter = require('./notificationRoutes');
const reportRouter = require('./reportRoutes');
const certificateRouter = require('./certificateRoutes');

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

// Submission management endpoints
router.use('/submissions', submissionRouter);

// Review & Judge evaluation endpoints
router.use('/reviews', reviewRouter);

// Leaderboard endpoints
router.use('/leaderboard', leaderboardRouter);

// Notification endpoints
router.use('/notifications', notificationRouter);

// Report & Analytics endpoints
router.use('/reports', reportRouter);

// Certificate endpoints
router.use('/certificates', certificateRouter);

module.exports = router;
