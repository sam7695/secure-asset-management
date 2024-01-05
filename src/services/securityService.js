const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Number of rounds to generate the salt for password hashing
const saltRounds = 10;

/**
 * Generates a hash of a password using bcrypt with a randomly generated salt.
 *
 * @param {string} password - The password to be hashed
 * @returns {string} - The hashed password
 */
const generateHash = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

/**
 * Compares a plain text password with a hashed password using bcrypt.
 *
 * @param {string} password - The plain text password
 * @param {string} hash - The hashed password to compare against
 * @returns {boolean} - True if the passwords match, false otherwise
 */
const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

/**
 * Generates a JSON Web Token (JWT) containing the user ID with a specified expiration time.
 *
 * @param {string} userId - The user ID to be included in the token
 * @returns {string} - The generated JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
};

// Exporting functions for external use
module.exports = { generateHash, compareHash, generateToken };
