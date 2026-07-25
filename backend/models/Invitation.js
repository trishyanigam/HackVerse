const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Invitation Model
// ===================================================

const INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED',
};

// ===================================================
// Invitation Schema
// ===================================================
const InvitationSchema = new mongoose.Schema(
  {
    // Team leader / member who sent the invitation
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender reference is required'],
      index: true,
    },

    // User receiving the invitation
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Receiver reference is required'],
      index: true,
    },

    // Target team
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team reference is required'],
      index: true,
    },

    status: {
      type: String,
      enum: {
        values: Object.values(INVITATION_STATUS),
        message: `Status must be one of: ${Object.values(INVITATION_STATUS).join(', ')}`,
      },
      default: INVITATION_STATUS.PENDING,
    },

    // Invitation expiration time (configurable)
    expiresAt: {
      type: Date,
      required: [true, 'Expiration date is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent active duplicate pending invitations to same user for same team
InvitationSchema.index({ receiver: 1, team: 1, status: 1 });

module.exports = mongoose.model('Invitation', InvitationSchema);
module.exports.INVITATION_STATUS = INVITATION_STATUS;
