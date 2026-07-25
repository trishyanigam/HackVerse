const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');

// ===================================================
// Disk Storage Engine Configuration
// ===================================================

/**
 * Disk storage engine for project submissions.
 * Uploads saved to: uploads/submissions/
 * Filename format: sub-<fieldname>-<timestamp>-<rand>.<ext>
 */
const submissionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'submissions');

    // Ensure directory exists recursively
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `sub-${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// ===================================================
// File Filter logic
// ===================================================

/**
 * Filter for screenshots (images) and presentationPdf (PDF).
 */
const submissionFileFilter = (req, file, cb) => {
  if (file.fieldname === 'screenshots') {
    const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (imageMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          `Invalid screenshot file type: ${file.mimetype}. Only JPEG, JPG, PNG, and WebP are allowed.`
        ),
        false
      );
    }
  } else if (file.fieldname === 'presentationPdf') {
    const pdfMimeTypes = ['application/pdf'];
    if (pdfMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          `Invalid presentation file type: ${file.mimetype}. Only PDF files are allowed.`
        ),
        false
      );
    }
  } else {
    cb(new ApiError(400, `Unexpected upload field: ${file.fieldname}`), false);
  }
};

// ===================================================
// Multer Upload Instance
// ===================================================

/**
 * Submission files uploader middleware.
 * - Screenshots: max 5 files, 5MB max each
 * - Presentation PDF: max 1 file, 20MB max
 */
const uploadSubmissionFiles = multer({
  storage: submissionStorage,
  fileFilter: submissionFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // Global max file size check (PDF 20MB limit)
  },
}).fields([
  { name: 'screenshots', maxCount: 5 },
  { name: 'presentationPdf', maxCount: 1 },
]);

module.exports = {
  uploadSubmissionFiles,
};
