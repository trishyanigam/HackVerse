const bcrypt = require('bcrypt');

/**
 * Hash a plain text password using bcrypt.
 *
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password string
 */
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare plain text password with a hashed password.
 *
 * @param {string} password - Plain text password input
 * @param {string} hashedPassword - Database hashed password
 * @returns {Promise<boolean>} Match resolution
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
