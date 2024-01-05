const jwt = require('jsonwebtoken');

/**
 * Middleware function to authenticate requests using JSON Web Tokens (JWT).
 * Extracts the token from the 'Authorization' header, verifies its validity,
 * and sets the authenticated user's ID in the request object.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const authenticate = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key');
    
    // Set the authenticated user's ID in the request object
    req.userId = decoded.userId;

    // Move to the next middleware
    next();
  } catch (error) {
    // Handle invalid tokens
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

/**
 * Middleware function to validate financial data in the request body.
 * Checks if the provided financial data has the expected format and required fields.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const validateFinancialData = (req, res, next) => {
  // Extract financial data from the request body
  const financialData = req.body.data;

  // Check if financial data is missing or not an object
  if (!financialData || typeof financialData !== 'object') {
    return res.status(400).json({ error: 'Invalid financial data format' });
  }

  // Check if required fields (account and balance) are present
  if (!financialData.account || !financialData.balance) {
    return res.status(400).json({ error: 'Financial data must include account and balance' });
  }

  // Will add more specific validation logic as needed for real cases

  // Move to the next middleware
  next();
};

// Exporting middleware functions for external use
module.exports = { authenticate, validateFinancialData };
