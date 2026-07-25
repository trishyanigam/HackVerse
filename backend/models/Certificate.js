const mongoose = require('mongoose');

// ===================================================
// Enum Constants for Certificate Types
// ===================================================

const CERTIFICATE_TYPE = {
  PARTICIPATION: 'Participation',
  WINNER: 'Winner',
  RUNNER_UP: 'Runner-Up',
  JUDGE: 'Judge',
  ORGANIZER: 'Organizer',
  VOLUNTEER: 'Volunteer',
};

// ===================================================
// Certificate Schema
// ===================================================
const CertificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient reference is required'],
      index: true,
    },

    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
      required: [true, 'Hackathon reference is required'],
      index: true,
    },

    type: {
      type: String,
      enum: {
        values: Object.values(CERTIFICATE_TYPE),
        message: `Certificate type must be one of: ${Object.values(CERTIFICATE_TYPE).join(', ')}`,
      },
      required: [true, 'Certificate type is required'],
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    pdfUrl: {
      type: String,
      required: [true, 'PDF file path is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate certificates of the same type for a user in the same hackathon
CertificateSchema.index({ recipient: 1, hackathon: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Certificate', CertificateSchema);
module.exports.CERTIFICATE_TYPE = CERTIFICATE_TYPE;
