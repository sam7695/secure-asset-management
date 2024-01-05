const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Create an instance of the Express application
const app = express();

// Set the port for the server to run on, defaulting to 3000 if not provided
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Routes middleware - Mounts the routes defined in the 'routes' module at the root path '/'
app.use('/', routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporting the app for potential testing or further usage
module.exports = app;
