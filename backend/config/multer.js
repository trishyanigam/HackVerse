const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');

// ===================================================
// Storage Configuration
// ===================================================

/**
 * Multer disk storage engine.
 * Saves uploaded files into uploads/hackathons/ directory.
 * Files are named: hackathon-<timestamp>-<randomNumber>.<ext>
 */
const hackathonBannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'hackathons');

    // Ensure the directory exists; create it recursively if missing
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    // Generate a unique filename to avoid collisions
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `hackathon-${uniqueSuffix}${ext}`);
  },
});

// ===================================================
// File Filter — Images Only
// ===================================================

/**
 * Accept only image MIME types.
 * Rejects all other file types with a descriptive error.
 */
const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file type: ${file.mimetype}. Only JPEG, PNG, GIF, and WebP images are allowed.`
      ),
      false // Reject file
    );
  }
};

// ===================================================
// Multer Upload Instance
// ===================================================

/**
 * Configured multer upload handler for hackathon banner images.
 * - Storage: local disk at uploads/hackathons/
 * - File filter: images only
 * - Size limit: 5MB
 */
const uploadHackathonBanner = multer({
  storage: hackathonBannerStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB in bytes
  },
});

module.exports = { uploadHackathonBanner };
