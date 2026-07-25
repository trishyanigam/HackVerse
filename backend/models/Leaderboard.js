const mongoose = require('mongoose');

// ===================================================
// Leaderboard Schema
// ===================================================
const LeaderboardSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: [true, 'Hackathon reference is required'],
      index: true,
    },

    rank: {
      type: Number,
      required: [true, 'Rank is required'],
      min: [1, 'Rank must be at least 1'],
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team reference is required'],
    },

    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: [true, 'Submission reference is required'],
    },

    averageScore: {
      type: Number,
      required: [true, 'Average score is required'],
      default: 0,
    },

    judgeCount: {
      type: Number,
      default: 0,
    },

    published: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast querying per rank in a hackathon
LeaderboardSchema.index({ hackathon: 1, rank: 1 });
LeaderboardSchema.index({ hackathon: 1, team: 1 }, { unique: true });

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
