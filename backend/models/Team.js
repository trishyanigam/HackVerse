const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Team Model
// ===================================================

const TEAM_STATUS = {
  ACTIVE: 'ACTIVE',
  LOCKED: 'LOCKED',
  DISBANDED: 'DISBANDED',
};

// ===================================================
// Team Schema
// ===================================================
const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
      maxlength: [100, 'Team name cannot exceed 100 characters'],
    },

    // Unique alphanumeric code for joining team
    teamCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    // Reference to target hackathon
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: [true, 'Hackathon reference is required'],
      index: true,
    },

    // Leader of the team
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Team leader reference is required'],
      index: true,
    },

    // Array of team members (includes leader)
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // Maximum members allowed in this team
    maxMembers: {
      type: Number,
      required: [true, 'Max members count is required'],
      min: [1, 'Max members must be at least 1'],
      default: 4,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    logo: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: {
        values: Object.values(TEAM_STATUS),
        message: `Team status must be one of: ${Object.values(TEAM_STATUS).join(', ')}`,
      },
      default: TEAM_STATUS.ACTIVE,
    },

    // Secret invitation code
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique team name within the same hackathon
TeamSchema.index({ teamName: 1, hackathon: 1 }, { unique: true });

// Text index for search
TeamSchema.index({ teamName: 'text', description: 'text' });

// Virtual helper: Check if team is full
TeamSchema.virtual('isFull').get(function () {
  return this.members ? this.members.length >= this.maxMembers : false;
});

TeamSchema.set('toJSON', { virtuals: true });
TeamSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Team', TeamSchema);
module.exports.TEAM_STATUS = TEAM_STATUS;
