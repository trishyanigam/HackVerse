const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Review Model
// ===================================================

const REVIEW_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
};

// ===================================================
// Review Schema
// ===================================================
const ReviewSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: [true, 'Submission reference is required'],
      index: true,
    },

    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: [true, 'Hackathon reference is required'],
      index: true,
    },

    judge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Judge reference is required'],
      index: true,
    },

    // Evaluation Criteria (Each min 0, max 10)
    innovation: {
      type: Number,
      required: [true, 'Innovation score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [10, 'Score cannot exceed 10'],
      default: 0,
    },

    technicalComplexity: {
      type: Number,
      required: [true, 'Technical complexity score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [10, 'Score cannot exceed 10'],
      default: 0,
    },

    uiUx: {
      type: Number,
      required: [true, 'UI/UX score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [10, 'Score cannot exceed 10'],
      default: 0,
    },

    functionality: {
      type: Number,
      required: [true, 'Functionality score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [10, 'Score cannot exceed 10'],
      default: 0,
    },

    scalability: {
      type: Number,
      required: [true, 'Scalability score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [10, 'Score cannot exceed 10'],
      default: 0,
    },

    documentation: {
      type: Number,
      required: [true, 'Documentation score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [10, 'Score cannot exceed 10'],
      default: 0,
    },

    presentation: {
      type: Number,
      required: [true, 'Presentation score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [10, 'Score cannot exceed 10'],
      default: 0,
    },

    feedback: {
      type: String,
      default: '',
      trim: true,
    },

    // Auto-calculated average of the 7 criteria (0.00 to 10.00)
    overallScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: {
        values: Object.values(REVIEW_STATUS),
        message: `Status must be one of: ${Object.values(REVIEW_STATUS).join(', ')}`,
      },
      default: REVIEW_STATUS.COMPLETED,
    },

    reviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Unique compound index: One review per judge per submission
ReviewSchema.index({ submission: 1, judge: 1 }, { unique: true });

// Pre-save middleware to automatically calculate overallScore
ReviewSchema.pre('save', function (next) {
  const sum =
    this.innovation +
    this.technicalComplexity +
    this.uiUx +
    this.functionality +
    this.scalability +
    this.documentation +
    this.presentation;

  // Round to two decimal places
  this.overallScore = Number((sum / 7).toFixed(2));
  next();
});

module.exports = mongoose.model('Review', ReviewSchema);
module.exports.REVIEW_STATUS = REVIEW_STATUS;
