const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your_secret_key'; // Store securely

// Swagger configuration with security scheme
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication and CRUD API',
      version: '1.0.0',
      description: 'API documentation for user login, registration, and CRUD operations',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional, just for documentation
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply this globally or individually as done in your endpoint definitions
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Token authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register endpoint
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: P@ssw0rd
 *     responses:
 *       200:
 *         description: Registration successful, JWT token returned
 */
app.post('/register', (req, res) => {
  const { username } = req.body;
  const user = { username };
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'User registered successfully', token });
});

// Login endpoint
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Authenticates user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: P@ssw0rd
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned
 */
app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = { username };
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// CRUD endpoints

// GET - Retrieve data
/**
 * @swagger
 * /data:
 *   get:
 *     summary: Retrieve data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 */
app.get('/data', authenticateToken, (req, res) => {
  res.json({ data: "Here's your data", user: req.user });
});

// POST - Add new data
/**
 * @swagger
 * /data:
 *   post:
 *     summary: Add new data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *                 example: "New Item"
 *     responses:
 *       201:
 *         description: Data added successfully
 */
app.post('/data', authenticateToken, (req, res) => {
  res.status(201).json({ message: 'Data added successfully', item: req.body.item });
});

// PUT - Update data
/**
 * @swagger
 * /data:
 *   put:
 *     summary: Update data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *                 example: "Updated Item"
 *     responses:
 *       200:
 *         description: Data updated successfully
 */
app.put('/data', authenticateToken, (req, res) => {
  res.json({ message: 'Data updated successfully', item: req.body.item });
});

// DELETE - Delete data
/**
 * @swagger
 * /data:
 *   delete:
 *     summary: Delete data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data deleted successfully
 */
app.delete('/data', authenticateToken, (req, res) => {
  res.json({ message: 'Data deleted successfully' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
