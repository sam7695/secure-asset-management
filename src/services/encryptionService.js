// encryptionService.js
const crypto = require('crypto');

// In-memory storage for key pairs (replace this with actual database interaction)
const keyPairs = {};

/**
 * Generates a new RSA key pair.
 *
 * @returns {Object} - Object containing publicKey and privateKey
 */
const generateKeyPair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  return { publicKey, privateKey };
};

/**
 * Retrieves the RSA key pair associated with a user.
 * If the key pair doesn't exist for the user, generates a new one.
 *
 * @param {string} userId - ID of the user
 * @returns {Object} - Object containing publicKey and privateKey
 */
const getFinancialDataKeyPair = (userId) => {
  // Check if key pair for the user already exists, otherwise generate a new one
  if (!keyPairs[userId]) {
    keyPairs[userId] = generateKeyPair();
  }

  return keyPairs[userId];
};

/**
 * Encrypts data using a given public key.
 *
 * @param {string} data - Data to be encrypted
 * @param {string} publicKey - Public key for encryption
 * @returns {string} - Base64-encoded encrypted data
 */
const encryptData = (data, publicKey) => {
  const bufferData = Buffer.from(data, 'utf-8');
  const encrypted = crypto.publicEncrypt(publicKey, bufferData);
  return encrypted.toString('base64');
};

/**
 * Decrypts data using a given private key.
 *
 * @param {string} encryptedData - Base64-encoded encrypted data
 * @param {string} privateKey - Private key for decryption
 * @returns {string} - Decrypted data
 */
const decryptData = (encryptedData, privateKey) => {
  const bufferEncryptedData = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt({ key: privateKey, passphrase: '' }, bufferEncryptedData);
  return decrypted.toString('utf-8');
};

// Exporting functions for external use
module.exports = { generateKeyPair, getFinancialDataKeyPair, encryptData, decryptData };
