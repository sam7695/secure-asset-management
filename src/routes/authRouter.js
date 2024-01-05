const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Express router handling authentication-related routes.
 * Routes include user registration, user login, and user logout.
 *
 * @type {express.Router} - Express router instance
 */

/**
 * Route to handle user registration.
 *
 * @name POST /auth/register
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response indicating success or error
 */
router.post('/register', authController.registerUser);

/**
 * Route to handle user login.
 *
 * @name POST /auth/login
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response containing a token and user ID on successful login
 */
router.post('/login', authController.login);

/**
 * Route to handle user logout.
 * Requires authentication middleware to ensure the user is authenticated.
 *
 * @name POST /auth/logout
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or error
 */
router.post('/logout', authMiddleware.authenticate, authController.logout);

// Export the router for external use
module.exports = router;
