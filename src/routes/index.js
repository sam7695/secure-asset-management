const express = require('express');
const router = express.Router();

// Importing routers for authentication and financial data
const authRouter = require('./authRouter');
const financialDataRouter = require('./financialDataRouter');

/**
 * Express router to organize and modularize routes.
 * Mounts authentication and financial data routers at specific paths.
 * All routes defined in 'authRouter' will be prefixed with '/auth',
 * and all routes defined in 'financialDataRouter' will be prefixed with '/financial'.
 *
 * @type {express.Router} - Express router instance
 */
router.use('/auth', authRouter);
router.use('/financial', financialDataRouter);

// Export the router for external use
module.exports = router;
