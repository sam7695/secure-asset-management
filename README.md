# Secure Asset Management

Secure your financial data with confidence.

## ✨ Features
- Secure data storage and retrieval
- User registration and authentication
- End-to-end encryption
- Token-based authorization
- Intuitive API for easy integration

## Prerequisites
- Node.js
- npm (Node Package Manager)

## Getting Started
1. Clone the repository:
    ```bash
    git clone https://github.com/sam7695/secure-asset-management.git
    cd secure-asset-management
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server and database:
    ```bash
    npm start
    npm run db:server
    ```

4. Your server should now be running on [http://localhost:3000](http://localhost:3000).

## API Documentation

## User Registration
**Endpoint:** `POST /auth/register`

Registers a new user.

### Request:
```json
{
  "username": "example_user",
  "password": "secretpassword"
}
```
### Response:
```json
{
  "message": "User registered successfully"
}
```
### CURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "example_user", "password": "secretpassword"}' http://localhost:3000/auth/register
```
## User Login
**Endpoint:** `POST /auth/login`

Logs in with existing credentials.

### Request:
```json
{
  "username": "example_user",
  "password": "secretpassword"
}
```

### Response:
```json
{
  "token": "your-access-token",
  "userId": "user-id"
}
```
### CURL:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "example_user", "password": "secretpassword"}' http://localhost:3000/auth/login
```

## User Logout
**Endpoint:** `POST /auth/logout`

Logs out the authenticated user.

### Request:
Include the Authorization header with the token.

### Response:
```json
{
  "message": "Logout successful"
}
```
### CURL:
```bash
curl -X POST -H "Authorization: Bearer your-access-token" http://localhost:3000/auth/logout
```
### Create Financial Data
**Endpoint:** `POST /financial/create-financial-data`

Creates encrypted financial data for the authenticated user.

### Request:
```json
{
  "data": {
    "account": "123456789",
    "balance": 1000
  }
}
```
Include the Authorization header with the token.
### Response:
```json
{
  "message": "Financial data created successfully"
}
```
### CURL:
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-access-token" -d '{"data": {"account": "123456789", "balance": 1000}}' http://localhost:3000/financial/create-financial-data
```

## Update Financial Data
**Endpoint:** `PUT /financial/update-financial-data`

Updates encrypted financial data for the authenticated user.

### Request:
```json
{
  "data": {
    "account": "123456789",
    "balance": 1500
  }
}
```
Include the Authorization header with the token.

### Response:
```json
{
  "message": "Financial data updated successfully"
}
```

#### CURL:
```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer your-access-token" -d '{"data": {"account": "123456789", "balance": 1500}}' http://localhost:3000/financial/update-financial-data
```

## Get Financial Data
**Endpoint:** `GET /financial/financial-data`

Retrieves decrypted financial data for the authenticated user.

### Request:
Include the Authorization header with the token.

Response:
```json
{
  "financialData": {
    "account": "123456789",
    "balance": 1500
  }
}
```

#### CURL:
```bash
curl -X GET -H "Authorization: Bearer your-access-token" http://localhost:3000/financial/financial-data
```

## Additional Considerations
- **Authorization:**
  - Restricts access to sensitive data only to authorized users.
  - Uses JWTs (JSON Web Tokens) for authentication.
  - Protects routes like `/auth/logout` to ensure only authenticated users can access them.

- **Data End-to-End Encryption:**
  - Ensures data privacy and security, even if intercepted during transmission or stored in the database.
  - Uses an encryption service to generate RSA key pairs, encrypt data with a public key, and decrypt data with a private key.
  - Generates a unique key pair for each user.

- **Test Assessment Setup:**
  - Uses a local server with a lightweight database for ease of testing and assessment.
  - Notes that a more robust database solution and server infrastructure would be required for real-world scenarios.

## Future Upgrades
- **Database replacement:**
  - Consider using MongoDB, PostgreSQL, or others in a production environment.

- **Infrastructure and security enhancements:**
  - Deploy on cloud platforms, implement HTTPS, and incorporate additional security measures.

## License
MIT License: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

## Contributing
Contributions are welcome! Please follow the contribution guidelines.

## Acknowledgements
- Node.js
- npm
- Local JSON Server
Protect your financial data today! ️
