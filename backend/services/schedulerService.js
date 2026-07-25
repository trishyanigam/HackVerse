const cron = require('node-cron');
const Hackathon = require('../models/Hackathon');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const Review = require('../models/Review');
const Notification = require('../models/Notification');
const logger = require('../utils/logger');
const emailService = require('./emailService');

/**
 * Initialize background cron jobs for reminders and automated platform maintenance.
 */
const initSchedulers = () => {
  logger.info('Initializing Node-Cron background schedulers...');

  // ===================================================
  // Job 1: Registration Deadline Reminder (Daily Midnight)
  // ===================================================
  cron.schedule('0 0 * * *', async () => {
    try {
      logger.info('[CRON] Running Registration Deadline Reminder check...');
      const now = new Date();
      const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const closingSoon = await Hackathon.find({
        registrationStatus: 'OPEN',
        registrationDeadline: { $gte: now, $lte: next24h },
        isDeleted: false,
      });

      for (const hackathon of closingSoon) {
        logger.info(`[CRON] Registration closing soon for: ${hackathon.title}`);
      }
    } catch (err) {
      logger.error(`[CRON ERROR] Registration deadline reminder failed: ${err.message}`);
    }
  });

  // ===================================================
  // Job 2: Submission Deadline Reminder (Every 6 Hours)
  // ===================================================
  cron.schedule('0 */6 * * *', async () => {
    try {
      logger.info('[CRON] Running Submission Deadline Reminder check...');
      const now = new Date();
      const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      const endingSoon = await Hackathon.find({
        status: 'PUBLISHED',
        endDate: { $gte: now, $lte: next24h },
        isDeleted: false,
      });

      for (const hackathon of endingSoon) {
        logger.info(`[CRON] Submission deadline closing soon for hackathon: ${hackathon.title}`);
      }
    } catch (err) {
      logger.error(`[CRON ERROR] Submission deadline reminder failed: ${err.message}`);
    }
  });

  // ===================================================
  // Job 3: Judge Evaluation Reminder (Daily at 9:00 AM)
  // ===================================================
  cron.schedule('0 9 * * *', async () => {
    try {
      logger.info('[CRON] Running Judge Evaluation Reminder check...');
      const endedHackathons = await Hackathon.find({
        status: 'PUBLISHED',
        endDate: { $lt: new Date() },
        isDeleted: false,
      }).populate('assignedJudges', 'fullName email');

      for (const hackathon of endedHackathons) {
        for (const judge of hackathon.assignedJudges) {
          logger.info(`[CRON] Evaluation reminder sent to judge ${judge.email} for ${hackathon.title}`);
        }
      }
    } catch (err) {
      logger.error(`[CRON ERROR] Judge evaluation reminder failed: ${err.message}`);
    }
  });

  // ===================================================
  // Job 4: Daily Cleanup (Daily at 3:00 AM)
  // Cleans old read notifications (>30 days old)
  // ===================================================
  cron.schedule('0 3 * * *', async () => {
    try {
      logger.info('[CRON] Running Daily Cleanup maintenance...');
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const deleted = await Notification.deleteMany({
        read: true,
        createdAt: { $lt: thirtyDaysAgo },
      });

      logger.info(`[CRON] Cleaned up ${deleted.deletedCount} old read notifications.`);
    } catch (err) {
      logger.error(`[CRON ERROR] Daily cleanup failed: ${err.message}`);
    }
  });

  logger.info('Node-Cron schedulers initialized successfully.');
};

module.exports = {
  initSchedulers,
};
