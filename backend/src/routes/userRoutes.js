const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Correct import

const router = express.Router();

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', registerUser);

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login a user and get a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: JWT token returned
 */
router.post('/login', loginUser);

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Get user details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 */
router.get('/user', verifyToken, getUserDetails); // Correct usage of middleware

module.exports = router;
