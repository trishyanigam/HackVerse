const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Submission Model
// ===================================================

const SUBMISSION_STATUS = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

// ===================================================
// Submission Schema
// ===================================================
const SubmissionSchema = new mongoose.Schema(
  {
    // Reference to team making the submission
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team reference is required'],
      index: true,
    },

    // Reference to target hackathon
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: [true, 'Hackathon reference is required'],
      index: true,
    },

    // Reference to team leader submitting the project
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Submitter reference is required'],
    },

    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [150, 'Project name cannot exceed 150 characters'],
    },

    problemStatement: {
      type: String,
      required: [true, 'Problem statement is required'],
      trim: true,
    },

    solution: {
      type: String,
      default: '',
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    githubRepository: {
      type: String,
      required: [true, 'GitHub repository URL is required'],
      trim: true,
    },

    liveDemoUrl: {
      type: String,
      default: '',
      trim: true,
    },

    demoVideoUrl: {
      type: String,
      default: '',
      trim: true,
    },

    techStack: {
      type: [String],
      default: [],
    },

    // Screenshots array (stored local paths or CDN URLs)
    screenshots: {
      type: [String],
      default: [],
    },

    // Presentation PDF path / URL
    presentationPdf: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: {
        values: Object.values(SUBMISSION_STATUS),
        message: `Status must be one of: ${Object.values(SUBMISSION_STATUS).join(', ')}`,
      },
      default: SUBMISSION_STATUS.SUBMITTED,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Enforce unique submission per team per hackathon
SubmissionSchema.index({ team: 1, hackathon: 1 }, { unique: true });

// Text index for search across projectName and techStack
SubmissionSchema.index(
  { projectName: 'text', description: 'text', solution: 'text' },
  { name: 'submission_text_search' }
);

module.exports = mongoose.model('Submission', SubmissionSchema);
module.exports.SUBMISSION_STATUS = SUBMISSION_STATUS;
