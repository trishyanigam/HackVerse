const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const notificationService = require('../services/notificationService');

// ===================================================
// Get User Notifications
// ===================================================

/**
 * @route   GET /api/v1/notifications
 * @desc    Get user notifications with unread counter and pagination
 * @access  Private [Logged-in user]
 */
const getUserNotifications = asyncHandler(async (req, res) => {
  const { notifications, unreadCount, pagination } = await notificationService.getUserNotifications(
    req.user._id,
    req.query
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Notifications retrieved successfully',
    data: { notifications, unreadCount },
    pagination,
  });
});

// ===================================================
// Mark Notification as Read
// ===================================================

/**
 * @route   PATCH /api/v1/notifications/:id/read
 * @desc    Mark single notification as read
 * @access  Private [Logged-in user]
 */
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(req.params.id, req.user._id);

  return successResponse(res, 200, 'Notification marked as read', { notification });
});

// ===================================================
// Mark All Notifications as Read
// ===================================================

/**
 * @route   PATCH /api/v1/notifications/read-all
 * @desc    Mark all notifications for logged-in user as read
 * @access  Private [Logged-in user]
 */
const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user._id);

  return successResponse(res, 200, 'All notifications marked as read', null);
});

// ===================================================
// Delete Notification
// ===================================================

/**
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete a notification
 * @access  Private [Logged-in user]
 */
const deleteNotification = asyncHandler(async (req, res) => {
  await notificationService.deleteNotification(req.params.id, req.user._id);

  return successResponse(res, 200, 'Notification deleted successfully', null);
});

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
