const Notification = require('../models/Notification');
const ApiError = require('../utils/ApiError');

// ===================================================
// Helper: Create System / Event Notification
// ===================================================

/**
 * Creates and stores an in-app notification.
 *
 * @param {Object} payload - { recipient, sender, title, message, type, metadata }
 * @returns {Promise<Object>} - Created notification document
 */
const createNotification = async ({
  recipient,
  sender = null,
  title,
  message,
  type = 'GENERAL',
  metadata = {},
}) => {
  return Notification.create({
    recipient,
    sender,
    title,
    message,
    type,
    metadata,
  });
};

// ===================================================
// Get User Notifications
// ===================================================

/**
 * Fetch notifications for requesting user with unread count and pagination.
 *
 * @param {string} userId - Recipient ObjectId
 * @param {Object} queryParams - Pagination & unread filter
 * @returns {Promise<Object>} - { notifications, unreadCount, pagination }
 */
const getUserNotifications = async (userId, queryParams) => {
  const { page = 1, limit = 10, unreadOnly = false } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const filter = { recipient: userId };
  if (unreadOnly === 'true' || unreadOnly === true) {
    filter.read = false;
  }

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(filter)
      .populate('sender', 'fullName profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Notification.countDocuments(filter),
    Notification.countDocuments({ recipient: userId, read: false }),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    notifications,
    unreadCount,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

// ===================================================
// Mark Single Notification as Read
// ===================================================

/**
 * Marks a notification as read.
 *
 * @param {string} notificationId - Notification ObjectId
 * @param {string} userId - Recipient ObjectId
 * @returns {Promise<Object>} - Updated notification
 */
const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOne({ _id: notificationId, recipient: userId });

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  notification.read = true;
  await notification.save();

  return notification;
};

// ===================================================
// Mark All Notifications as Read
// ===================================================

/**
 * Marks all notifications for a user as read.
 *
 * @param {string} userId - Recipient ObjectId
 * @returns {Promise<void>}
 */
const markAllAsRead = async (userId) => {
  await Notification.updateMany({ recipient: userId, read: false }, { $set: { read: true } });
};

// ===================================================
// Delete Notification
// ===================================================

/**
 * Deletes a notification.
 *
 * @param {string} notificationId - Notification ObjectId
 * @param {string} userId - Recipient ObjectId
 * @returns {Promise<void>}
 */
const deleteNotification = async (notificationId, userId) => {
  const notification = await Notification.findOne({ _id: notificationId, recipient: userId });

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  await Notification.findByIdAndDelete(notificationId);
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
