const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Notification Model
// ===================================================

const NOTIFICATION_TYPE = {
  GENERAL: 'GENERAL',
  REGISTRATION: 'REGISTRATION',
  TEAM: 'TEAM',
  SUBMISSION: 'SUBMISSION',
  JUDGING: 'JUDGING',
  RESULT: 'RESULT',
  CERTIFICATE: 'CERTIFICATE',
  SYSTEM: 'SYSTEM',
};

// ===================================================
// Notification Schema
// ===================================================
const NotificationSchema = new mongoose.Schema(
  {
    // User receiving the notification
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient reference is required'],
      index: true,
    },

    // User or System sending the notification
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true,
    },

    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true,
    },

    type: {
      type: String,
      enum: {
        values: Object.values(NOTIFICATION_TYPE),
        message: `Notification type must be one of: ${Object.values(NOTIFICATION_TYPE).join(', ')}`,
      },
      default: NOTIFICATION_TYPE.GENERAL,
    },

    read: {
      type: Boolean,
      default: false,
      index: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);
module.exports.NOTIFICATION_TYPE = NOTIFICATION_TYPE;
