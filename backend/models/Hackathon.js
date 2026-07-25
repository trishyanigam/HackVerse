const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Hackathon Model
// ===================================================

const HACKATHON_MODE = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  HYBRID: 'HYBRID',
};

const HACKATHON_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  COMPLETED: 'COMPLETED',
};

const REGISTRATION_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};

const VISIBILITY = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};

// ===================================================
// FAQ Sub-Schema
// ===================================================
const FaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// ===================================================
// Judging Criteria Sub-Schema
// ===================================================
const JudgingCriteriaSchema = new mongoose.Schema(
  {
    criterion: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    maxScore: {
      type: Number,
      default: 10,
      min: [1, 'Max score must be at least 1'],
    },
  },
  { _id: false }
);

// ===================================================
// Sponsor Sub-Schema
// ===================================================
const SponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    tier: {
      type: String,
      enum: ['PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'COMMUNITY'],
      default: 'COMMUNITY',
    },
  },
  { _id: false }
);

// ===================================================
// Main Hackathon Schema
// ===================================================
const HackathonSchema = new mongoose.Schema(
  {
    // Core Identity
    title: {
      type: String,
      required: [true, 'Hackathon title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },

    // Auto-generated URL-friendly identifier from title
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },

    theme: {
      type: String,
      required: [true, 'Theme is required'],
      trim: true,
    },

    // Event Format
    mode: {
      type: String,
      enum: {
        values: Object.values(HACKATHON_MODE),
        message: `Mode must be one of: ${Object.values(HACKATHON_MODE).join(', ')}`,
      },
      required: [true, 'Mode is required'],
    },

    // Physical venue info — required only when mode is OFFLINE or HYBRID
    venue: {
      name: { type: String, default: '' },
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: '' },
    },

    // Banner image stored in uploads directory
    bannerImage: {
      type: String,
      default: '',
    },

    // Date & Time
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },

    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },

    registrationDeadline: {
      type: Date,
      required: [true, 'Registration deadline is required'],
    },

    // Registration control
    registrationStatus: {
      type: String,
      enum: {
        values: Object.values(REGISTRATION_STATUS),
        message: `Registration status must be one of: ${Object.values(REGISTRATION_STATUS).join(', ')}`,
      },
      default: REGISTRATION_STATUS.CLOSED,
    },

    // Prize information
    prizePool: {
      total: { type: Number, default: 0, min: [0, 'Prize pool cannot be negative'] },
      currency: { type: String, default: 'INR' },
      distribution: {
        first: { type: Number, default: 0 },
        second: { type: Number, default: 0 },
        third: { type: Number, default: 0 },
      },
    },

    // Team size constraint
    maximumTeamSize: {
      type: Number,
      required: [true, 'Maximum team size is required'],
      min: [1, 'Maximum team size must be at least 1'],
      default: 4,
    },

    minimumTeamSize: {
      type: Number,
      default: 1,
      min: [1, 'Minimum team size must be at least 1'],
    },

    // Content arrays
    rules: {
      type: [String],
      default: [],
    },

    judgingCriteria: {
      type: [JudgingCriteriaSchema],
      default: [],
    },

    sponsors: {
      type: [SponsorSchema],
      default: [],
    },

    // Contact Information
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid contact email'],
    },

    contactPhone: {
      type: String,
      trim: true,
      default: '',
    },

    // Frequently Asked Questions
    faq: {
      type: [FaqSchema],
      default: [],
    },

    // Lifecycle Management
    status: {
      type: String,
      enum: {
        values: Object.values(HACKATHON_STATUS),
        message: `Status must be one of: ${Object.values(HACKATHON_STATUS).join(', ')}`,
      },
      default: HACKATHON_STATUS.DRAFT,
    },

    visibility: {
      type: String,
      enum: {
        values: Object.values(VISIBILITY),
        message: `Visibility must be one of: ${Object.values(VISIBILITY).join(', ')}`,
      },
      default: VISIBILITY.PRIVATE,
    },

    // Soft delete flag — deleted hackathons are hidden but retained in DB
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    // ===================================================
    // Relations
    // ===================================================

    // Reference to the organizing user
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator reference is required'],
    },

    // Array of Judge user references assigned to this hackathon
    assignedJudges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // ===================================================
    // Aggregated Statistics (updated by registration/team/submission events)
    // ===================================================
    totalRegistrations: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalTeams: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalSubmissions: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    // createdAt and updatedAt auto-managed by mongoose
    timestamps: true,
  }
);

// ===================================================
// Indexes for Performance
// ===================================================

// Compound index for public listing queries
HackathonSchema.index({ status: 1, visibility: 1, isDeleted: 1 });

// Text index for full-text search across title, theme, description
HackathonSchema.index(
  { title: 'text', theme: 'text', description: 'text' },
  { name: 'hackathon_text_search' }
);

// Date-based sorting index
HackathonSchema.index({ startDate: 1, endDate: 1 });

// ===================================================
// Virtual Fields
// ===================================================

/**
 * Compute hackathon timeline state dynamically.
 * Returns: 'UPCOMING' | 'ONGOING' | 'COMPLETED'
 */
HackathonSchema.virtual('timelineStatus').get(function () {
  const now = new Date();
  if (now < this.startDate) return 'UPCOMING';
  if (now >= this.startDate && now <= this.endDate) return 'ONGOING';
  return 'COMPLETED';
});

// Include virtuals when converting to JSON/Object
HackathonSchema.set('toJSON', { virtuals: true });
HackathonSchema.set('toObject', { virtuals: true });

// ===================================================
// Exports
// ===================================================

module.exports = mongoose.model('Hackathon', HackathonSchema);

// Export enum constants for reuse across the codebase
module.exports.HACKATHON_MODE = HACKATHON_MODE;
module.exports.HACKATHON_STATUS = HACKATHON_STATUS;
module.exports.REGISTRATION_STATUS = REGISTRATION_STATUS;
module.exports.VISIBILITY = VISIBILITY;
