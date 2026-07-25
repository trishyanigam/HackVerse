const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// ===================================================
// Nodemailer Transport Configuration
// ===================================================

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });
};

/**
 * Generic HTML email template wrapper
 */
const wrapEmailTemplate = (title, bodyHtml) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .content { padding: 30px; line-height: 1.6; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
        .footer { background: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${bodyHtml}
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} HackVerse Platform. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Sends email. Logs simulation in development mode if SMTP credentials missing.
 */
const sendMail = async ({ to, subject, html }) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      logger.info(`[MAIL SIMULATION] To: ${to} | Subject: ${subject}`);
      return { messageId: 'simulated-mail-id' };
    }

    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'HackVerse Platform'}" <${process.env.SMTP_FROM_EMAIL || 'noreply@hackverse.com'}>`,
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error.message}`);
    // Non-blocking in production — return error status
    return null;
  }
};

// ===================================================
// Specialized Email Template Dispatchers
// ===================================================

/**
 * 1. Registration Confirmation
 */
const sendRegistrationConfirmationEmail = async (email, fullName, hackathonTitle) => {
  const html = wrapEmailTemplate(
    'Registration Confirmed!',
    `<p>Hello <strong>${fullName}</strong>,</p>
     <p>Your registration for <strong>${hackathonTitle}</strong> has been successfully confirmed!</p>
     <p>Get ready to build something incredible. Check your dashboard for team formation and event timeline updates.</p>`
  );
  return sendMail({ to: email, subject: `Registered for ${hackathonTitle}`, html });
};

/**
 * 2. Team Invitation
 */
const sendTeamInvitationEmail = async (email, inviterName, teamName, hackathonTitle) => {
  const html = wrapEmailTemplate(
    'Team Invitation',
    `<p>Hello!</p>
     <p><strong>${inviterName}</strong> has invited you to join team <strong>${teamName}</strong> for the upcoming <strong>${hackathonTitle}</strong>.</p>
     <p>Log in to your HackVerse account to accept or decline the invitation.</p>`
  );
  return sendMail({ to: email, subject: `Invitation to join ${teamName} on HackVerse`, html });
};

/**
 * 3. Submission Confirmation
 */
const sendSubmissionConfirmationEmail = async (email, teamName, projectName, hackathonTitle) => {
  const html = wrapEmailTemplate(
    'Submission Received!',
    `<p>Congratulations Team <strong>${teamName}</strong>!</p>
     <p>Your project <strong>${projectName}</strong> has been successfully submitted for <strong>${hackathonTitle}</strong>.</p>
     <p>Our judges will review your submission shortly.</p>`
  );
  return sendMail({ to: email, subject: `Project Submitted: ${projectName}`, html });
};

/**
 * 4. Judge Assignment
 */
const sendJudgeAssignmentEmail = async (email, judgeName, hackathonTitle) => {
  const html = wrapEmailTemplate(
    'Judge Panel Assignment',
    `<p>Hello <strong>${judgeName}</strong>,</p>
     <p>You have been assigned as an official Judge for <strong>${hackathonTitle}</strong>.</p>
     <p>Please log in to your evaluation dashboard to review assigned project submissions.</p>`
  );
  return sendMail({ to: email, subject: `Judge Assignment for ${hackathonTitle}`, html });
};

/**
 * 5. Result Announcement
 */
const sendResultAnnouncementEmail = async (email, fullName, hackathonTitle) => {
  const html = wrapEmailTemplate(
    'Results Announced!',
    `<p>Hello <strong>${fullName}</strong>,</p>
     <p>The official results for <strong>${hackathonTitle}</strong> have just been published!</p>
     <p>Check out the live leaderboard now to see the winning teams and evaluation scores.</p>`
  );
  return sendMail({ to: email, subject: `Official Results Published: ${hackathonTitle}`, html });
};

/**
 * 6. Certificate Available
 */
const sendCertificateAvailableEmail = async (email, fullName, certificateType, hackathonTitle) => {
  const html = wrapEmailTemplate(
    'Certificate Available for Download',
    `<p>Hello <strong>${fullName}</strong>,</p>
     <p>Your official <strong>${certificateType} Certificate</strong> for <strong>${hackathonTitle}</strong> is now ready for download.</p>
     <p>Visit your dashboard to view and download your verified PDF certificate.</p>`
  );
  return sendMail({ to: email, subject: `Your Certificate for ${hackathonTitle} is ready!`, html });
};

/**
 * 7. Password Reset
 */
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
  const html = wrapEmailTemplate(
    'Password Reset Request',
    `<p>We received a request to reset your password.</p>
     <p>Click the button below to set a new password. Link valid for 1 hour:</p>
     <p><a href="${resetUrl}" class="button">Reset Password</a></p>`
  );
  return sendMail({ to: email, subject: 'HackVerse Password Reset Request', html });
};

/**
 * 8. Email Verification
 */
const sendEmailVerificationEmail = async (email, verifyToken) => {
  const verifyUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email/${verifyToken}`;
  const html = wrapEmailTemplate(
    'Verify Your Email',
    `<p>Welcome to HackVerse!</p>
     <p>Please click the button below to verify your email address:</p>
     <p><a href="${verifyUrl}" class="button">Verify Email</a></p>`
  );
  return sendMail({ to: email, subject: 'Verify your HackVerse account', html });
};

module.exports = {
  sendMail,
  sendRegistrationConfirmationEmail,
  sendTeamInvitationEmail,
  sendSubmissionConfirmationEmail,
  sendJudgeAssignmentEmail,
  sendResultAnnouncementEmail,
  sendCertificateAvailableEmail,
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
};
