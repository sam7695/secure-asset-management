const express = require('express');
const router = express.Router();
const financialDataController = require('../controllers/financialData');
const { authenticate, validateFinancialData } = require('../middleware/authMiddleware');

/**
 * Express router handling financial data-related routes.
 * Routes include creating financial data, updating financial data, and retrieving financial data.
 *
 * @type {express.Router} - Express router instance
 */

/**
 * Route to handle the creation of financial data.
 * Requires authentication and validation middleware.
 *
 * @name POST /financial/create-financial-data
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or error
 */
router.post('/create-financial-data', authenticate, validateFinancialData, financialDataController.createFinancialData);

/**
 * Route to handle the update of financial data.
 * Requires authentication and validation middleware.
 *
 * @name PUT /financial/update-financial-data
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Object} - JSON response indicating success or error
 */
router.put('/update-financial-data', authenticate, validateFinancialData, financialDataController.updateFinancialData);

/**
 * Route to handle the retrieval of financial data.
 * Requires authentication.
 *
 * @name GET /financial/financial-data
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response containing financial data
 */
router.get('/financial-data', authenticate, financialDataController.getFinancialData);

// Export the router for external use
module.exports = router;
