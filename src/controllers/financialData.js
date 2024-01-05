const axios = require('axios');
const encryptionService = require('../services/encryptionService');
const securityService = require('../services/securityService');
const authMiddleware = require('../middleware/authMiddleware');

const createFinancialData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newData = req.body.data;

    if (!isValidFinancialData(newData)) {
      return res.status(400).json({ error: 'Invalid financial data' });
    }

    // Generate a key pair for the user's financial data
    const keyPair = encryptionService.generateKeyPair();

    // Encrypt the financial data with the public key
    const encryptedData = encryptionService.encryptData(JSON.stringify(newData), keyPair.publicKey);

    // Save the encrypted data to the database
    await saveFinancialDataToDatabase(userId, encryptedData, keyPair.privateKey);

    res.json({ message: 'Financial data created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateFinancialData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updatedData = req.body.data;

    if (!isValidFinancialData(updatedData)) {
      return res.status(400).json({ error: 'Invalid financial data' });
    }

    // Retrieve the user's key pair from the in-memory storage
    const keyPair = encryptionService.getFinancialDataKeyPair(userId);

    // Encrypt the updated financial data with the public key
    const encryptedData = encryptionService.encryptData(JSON.stringify(updatedData), keyPair.publicKey);

    // Update the encrypted data in the database
    await updateFinancialDataInDatabase(userId, encryptedData);

    res.json({ message: 'Financial data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFinancialData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve the user's key pair from the in-memory storage
    const keyPair = encryptionService.getFinancialDataKeyPair(userId);

    // Retrieve the encrypted financial data from the database
    const userFinancialData = await getFinancialDataFromDatabase(userId);

    if (!userFinancialData) {
      return res.status(404).json({ error: 'Financial data not found' });
    }

    // Decrypt the financial data with the user's private key
    const decryptedData = encryptionService.decryptData(userFinancialData.data, keyPair.privateKey);

    res.json({ financialData: JSON.parse(decryptedData) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveFinancialDataToDatabase = async (userId, encryptedData) => {
  try {
    await axios.post('http://localhost:3001/financialData', { userId, data: encryptedData });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateFinancialDataInDatabase = async (userId, encryptedData) => {
  try {
    await axios.put(`http://localhost:3001/financialData/${userId}`, { userId, data: encryptedData });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFinancialDataFromDatabase = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/financialData/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const isValidFinancialData = (data) => {
  // Implement your validation logic here
  return true; // Placeholder, update based on your rules
};

module.exports = { createFinancialData, updateFinancialData, getFinancialData };
