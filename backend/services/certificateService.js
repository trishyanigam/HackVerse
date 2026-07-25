const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Certificate = require('../models/Certificate');
const Hackathon = require('../models/Hackathon');
const Leaderboard = require('../models/Leaderboard');
const Registration = require('../models/Registration');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const emailService = require('./emailService');
const notificationService = require('./notificationService');

// ===================================================
// Helper: Unique Certificate ID Generator
// ===================================================

const generateCertificateId = () => {
  const code = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `CERT-${code.slice(0, 4)}-${code.slice(4)}`;
};

// ===================================================
// PDFKit Certificate Builder
// ===================================================

/**
 * Renders a PDF certificate document using PDFKit.
 * Modular structure allows future layout customization.
 *
 * @param {Object} certData - { certificateId, recipientName, hackathonTitle, certType, issueDate, organizerName }
 * @returns {Promise<string>} - Relative file path of generated PDF
 */
const renderPDFCertificate = (certData) => {
  return new Promise((resolve, reject) => {
    const {
      certificateId,
      recipientName,
      hackathonTitle,
      certType,
      issueDate,
      organizerName,
    } = certData;

    const outputDir = path.join(process.cwd(), 'uploads', 'certificates');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `cert-${certificateId.toLowerCase()}.pdf`;
    const filePath = path.join(outputDir, filename);
    const writeStream = fs.createWriteStream(filePath);

    // Create landscape A4 document
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margin: 40,
    });

    doc.pipe(writeStream);

    // ------------------- Background Border -------------------
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
       .lineWidth(4)
       .strokeColor('#4f46e5')
       .stroke();

    doc.rect(28, 28, doc.page.width - 56, doc.page.height - 56)
       .lineWidth(1)
       .strokeColor('#7c3aed')
       .stroke();

    // ------------------- Header Brand -------------------
    doc.fontSize(24)
       .fillColor('#4f46e5')
       .font('Helvetica-Bold')
       .text('HACKVERSE PLATFORM', 0, 70, { align: 'center' });

    doc.fontSize(12)
       .fillColor('#6b7280')
       .font('Helvetica')
       .text('OFFICIAL CERTIFICATE OF ACHIEVEMENT', 0, 100, { align: 'center' });

    // ------------------- Certificate Title -------------------
    doc.fontSize(32)
       .fillColor('#1f2937')
       .font('Helvetica-Bold')
       .text(`CERTIFICATE OF ${certType.toUpperCase()}`, 0, 140, { align: 'center' });

    doc.fontSize(14)
       .fillColor('#4b5563')
       .font('Helvetica')
       .text('This certificate is proudly presented to', 0, 190, { align: 'center' });

    // ------------------- Recipient Name -------------------
    doc.fontSize(28)
       .fillColor('#4f46e5')
       .font('Helvetica-Bold')
       .text(recipientName, 0, 220, { align: 'center' });

    // ------------------- Description -------------------
    doc.fontSize(14)
       .fillColor('#374151')
       .font('Helvetica')
       .text(`for outstanding participation and contribution in`, 0, 265, { align: 'center' });

    doc.fontSize(20)
       .fillColor('#111827')
       .font('Helvetica-Bold')
       .text(hackathonTitle, 0, 290, { align: 'center' });

    // ------------------- Signatures & Verification -------------------
    const yPos = 380;

    // Issue Date & ID (Left)
    doc.fontSize(10).fillColor('#6b7280').font('Helvetica');
    doc.text(`Issue Date: ${new Date(issueDate).toLocaleDateString()}`, 80, yPos);
    doc.text(`Certificate ID: ${certificateId}`, 80, yPos + 16);

    // Organizer Signature Line (Right)
    doc.strokeColor('#9ca3af').lineWidth(1).moveTo(600, yPos + 10).lineTo(760, yPos + 10).stroke();
    doc.fontSize(10).fillColor('#374151').font('Helvetica-Bold').text(organizerName, 600, yPos + 16);
    doc.fontSize(9).fillColor('#6b7280').font('Helvetica').text('Event Organizer', 600, yPos + 28);

    // QR Verification Placeholder Box (Center Bottom)
    doc.rect(390, yPos - 10, 60, 60).lineWidth(1).strokeColor('#d1d5db').stroke();
    doc.fontSize(7).fillColor('#9ca3af').text('QR VERIFY', 395, yPos + 16);

    doc.end();

    writeStream.on('finish', () => {
      resolve(`uploads/certificates/${filename}`);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
};

// ===================================================
// Generate Certificates for a Hackathon (Organizer / Admin)
// ===================================================

/**
 * Batch generates certificates for all eligible participants/winners in a hackathon.
 *
 * Rules:
 * 1. Hackathon results / leaderboard MUST be published first!
 * 2. Only Organizer owner or Admin can trigger generation.
 *
 * @param {string} hackathonId - Target hackathon ID
 * @param {Object} requestingUser - Authenticated organizer/admin
 * @returns {Promise<Object>} - { generatedCount, message }
 */
const generateHackathonCertificates = async (hackathonId, requestingUser) => {
  const hackathon = await Hackathon.findOne({ _id: hackathonId, isDeleted: false }).populate(
    'createdBy',
    'fullName'
  );

  if (!hackathon) {
    throw new ApiError(404, 'Hackathon not found');
  }

  // Authorization check
  const isOrganizer = hackathon.createdBy._id.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';

  if (!isOrganizer && !isAdmin) {
    throw new ApiError(403, 'Access denied. Only the hackathon organizer can generate certificates.');
  }

  // Verify leaderboard is published
  const isPublished = await Leaderboard.exists({ hackathon: hackathonId, published: true });
  if (!isPublished) {
    throw new ApiError(
      400,
      'Certificates can only be generated after hackathon results are published.'
    );
  }

  const organizerName = hackathon.createdBy.fullName || 'HackVerse Organizing Team';

  // 1. Fetch registered participants
  const registrations = await Registration.find({
    hackathon: hackathonId,
    status: 'APPROVED',
  }).populate('participant', 'fullName email');

  // 2. Fetch top winner ranks from Leaderboard
  const topRankings = await Leaderboard.find({ hackathon: hackathonId })
    .populate({
      path: 'team',
      populate: { path: 'members', select: 'fullName email' },
    })
    .sort({ rank: 1 })
    .lean();

  const winnerUserIds = new Set();
  const runnerUpUserIds = new Set();

  if (topRankings.length > 0 && topRankings[0].team) {
    topRankings[0].team.members.forEach((m) => winnerUserIds.add(m._id.toString()));
  }
  if (topRankings.length > 1 && topRankings[1].team) {
    topRankings[1].team.members.forEach((m) => runnerUpUserIds.add(m._id.toString()));
  }

  let generatedCount = 0;

  for (const reg of registrations) {
    const user = reg.participant;
    if (!user) continue;

    let certType = 'Participation';
    if (winnerUserIds.has(user._id.toString())) {
      certType = 'Winner';
    } else if (runnerUpUserIds.has(user._id.toString())) {
      certType = 'Runner-Up';
    }

    // Check if certificate already exists
    const existingCert = await Certificate.findOne({
      recipient: user._id,
      hackathon: hackathonId,
      type: certType,
    });

    if (existingCert) continue; // Skip duplicates

    const certificateId = generateCertificateId();

    const pdfUrl = await renderPDFCertificate({
      certificateId,
      recipientName: user.fullName,
      hackathonTitle: hackathon.title,
      certType,
      issueDate: new Date(),
      organizerName,
    });

    await Certificate.create({
      certificateId,
      recipient: user._id,
      hackathon: hackathonId,
      type: certType,
      issueDate: new Date(),
      pdfUrl,
    });

    generatedCount++;

    // Send in-app notification & email
    await notificationService.createNotification({
      recipient: user._id,
      title: 'Certificate Ready!',
      message: `Your ${certType} Certificate for ${hackathon.title} is now available for download.`,
      type: 'CERTIFICATE',
      metadata: { hackathonId, certificateId },
    });

    emailService.sendCertificateAvailableEmail(user.email, user.fullName, certType, hackathon.title);
  }

  return {
    generatedCount,
    message: `Successfully generated ${generatedCount} certificates for ${hackathon.title}.`,
  };
};

// ===================================================
// Get My Certificates
// ===================================================

/**
 * Returns certificates issued to the requesting participant.
 *
 * @param {string} userId - Recipient ObjectId
 * @returns {Promise<Array>} - Certificates array
 */
const getMyCertificates = async (userId) => {
  const certificates = await Certificate.find({ recipient: userId })
    .populate('hackathon', 'title slug bannerImage startDate endDate')
    .sort({ issueDate: -1 });

  return certificates;
};

// ===================================================
// Download Certificate File
// ===================================================

/**
 * Fetches certificate for download, verifying ownership or admin status.
 *
 * @param {string} certificateId - Certificate ID or ObjectId
 * @param {Object} requestingUser - Authenticated user
 * @returns {Promise<Object>} - { filePath, filename }
 */
const getCertificateForDownload = async (certificateId, requestingUser) => {
  const mongoose = require('mongoose');
  const query = mongoose.Types.ObjectId.isValid(certificateId)
    ? { _id: certificateId }
    : { certificateId: certificateId.toUpperCase() };

  const cert = await Certificate.findOne(query).populate('recipient', 'fullName');

  if (!cert) {
    throw new ApiError(404, 'Certificate not found');
  }

  const isOwner = cert.recipient._id.toString() === requestingUser._id.toString();
  const isAdmin = requestingUser.role === 'ADMIN';
  const isOrganizer = requestingUser.role === 'ORGANIZER';

  if (!isOwner && !isAdmin && !isOrganizer) {
    throw new ApiError(403, 'Access denied. You can only download your own certificate.');
  }

  const absolutePath = path.join(process.cwd(), cert.pdfUrl);

  if (!fs.existsSync(absolutePath)) {
    throw new ApiError(404, 'Certificate PDF file is missing on server');
  }

  return {
    filePath: absolutePath,
    filename: `Certificate-${cert.certificateId}.pdf`,
  };
};

module.exports = {
  generateHackathonCertificates,
  getMyCertificates,
  getCertificateForDownload,
};
