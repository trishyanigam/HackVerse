const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');
const authenticate = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { validateListNotifications } = require('../validators/notificationValidator');

// =====================================================
// User Notification Routes
// =====================================================

/**
 * @route   GET /api/v1/notifications
 * @desc    Get logged-in user's notifications
 * @access  Private [Logged-in user]
 */
router.get(
  '/',
  authenticate,
  validateListNotifications,
  validate,
  notificationController.getUserNotifications
);

/**
 * @route   PATCH /api/v1/notifications/read-all
 * @desc    Mark all notifications for user as read
 * @access  Private [Logged-in user]
 */
router.patch(
  '/read-all',
  authenticate,
  notificationController.markAllAsRead
);

/**
 * @route   PATCH /api/v1/notifications/:id/read
 * @desc    Mark a single notification as read
 * @access  Private [Logged-in user]
 */
router.patch(
  '/:id/read',
  authenticate,
  notificationController.markAsRead
);

/**
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete a notification
 * @access  Private [Logged-in user]
 */
router.delete(
  '/:id',
  authenticate,
  notificationController.deleteNotification
);

module.exports = router;
