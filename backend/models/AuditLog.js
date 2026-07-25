const mongoose = require('mongoose');

// ===================================================
// AuditLog Schema
// ===================================================
const AuditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },

    action: {
      type: String,
      required: [true, 'Action is required'],
      trim: true,
    },

    module: {
      type: String,
      required: [true, 'Module name is required'],
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    ipAddress: {
      type: String,
      default: '',
    },

    userAgent: {
      type: String,
      default: '',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

AuditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
