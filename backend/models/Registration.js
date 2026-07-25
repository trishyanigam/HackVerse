const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Registration Model
// ===================================================

const REGISTRATION_RECORD_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
};

// ===================================================
// Registration Schema
// ===================================================
const RegistrationSchema = new mongoose.Schema(
  {
    // Reference to registering participant
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Participant reference is required'],
      index: true,
    },

    // Reference to hackathon
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: [true, 'Hackathon reference is required'],
      index: true,
    },

    // Reference to team (if joined or created a team)
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },

    // Registration approval state
    status: {
      type: String,
      enum: {
        values: Object.values(REGISTRATION_RECORD_STATUS),
        message: `Status must be one of: ${Object.values(REGISTRATION_RECORD_STATUS).join(', ')}`,
      },
      default: REGISTRATION_RECORD_STATUS.APPROVED, // Default approved or pending as per event config
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },

    // Approval metadata
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    approvalDate: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ===================================================
// Compound Index: Enforce One Registration per User per Hackathon
// ===================================================
RegistrationSchema.index({ participant: 1, hackathon: 1 }, { unique: true });

// Exports
module.exports = mongoose.model('Registration', RegistrationSchema);
module.exports.REGISTRATION_RECORD_STATUS = REGISTRATION_RECORD_STATUS;
