const axios = require('axios');
const securityService = require('../services/securityService');

const dbUrl = 'http://localhost:3001/users';

/**
 * Registers a new user by checking if the username already exists,
 * hashing the password, and storing the user in the database.
 */
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = securityService.generateHash(password);

    // Create a new user object with the hashed password
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Send a POST request to store the new user in the database
    await axios.post(dbUrl, newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Authenticates a user by checking the provided credentials and
 * generating a token for successful logins.
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user information by username
    const user = await getUserByUsername(username);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password with the provided password
    const passwordMatch = securityService.compareHash(password, user.password);

    // If passwords do not match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a token for the authenticated user
    const token = securityService.generateToken(user.id);

    // Update the user's token in the database
    await updateTokenInDatabase(user.id, token);

    // Respond with the generated token and user ID
    res.json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Logs out a user by updating their token in the database to null.
 */
const logout = async (req, res) => {
  const userId = req.userId;

  try {
    // Update the user's token in the database to null
    await updateTokenInDatabase(userId, null);

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves user information by username from the database.
 *
 * @param {string} username - The username to search for
 * @returns {Object} - User information object
 */
const getUserByUsername = async (username) => {
  try {
    // Send a GET request to retrieve user information by username
    const response = await axios.get(`${dbUrl}?username=${username}`);
    return response.data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Updates the user's token in the database.
 *
 * @param {string} userId - The ID of the user to update
 * @param {string} token - The token to set for the user
 */
const updateTokenInDatabase = async (userId, token) => {
  try {
    // Send a PATCH request to update the user's token in the database
    await axios.patch(`${dbUrl}/${userId}`, { token });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Exporting functions for external use
module.exports = { registerUser, login, logout, getUserByUsername, updateTokenInDatabase };
