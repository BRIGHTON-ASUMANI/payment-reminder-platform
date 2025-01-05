const express = require('express');
const { sendCall, getCallLogs } = require('../controllers/callController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Correct import

const router = express.Router();

/**
 * @swagger
 * /api/call:
 *   post:
 *     summary: Initiate a call and log it
 *     tags: [Calls]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               paymentAmount:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               language:
 *                 type: string
 *             required:
 *               - customerName
 *               - phoneNumber
 *               - paymentAmount
 *               - dueDate
 *               - language
 *     responses:
 *       200:
 *         description: Call initiated and logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 callSid:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/call', verifyToken, sendCall); // Apply the verifyToken middleware

/**
 * @swagger
 * /api/call/logs:
 *   get:
 *     summary: Retrieve all call logs
 *     tags: [Calls]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of call logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   customerName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   paymentAmount:
 *                     type: number
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/call/logs', verifyToken, getCallLogs); // Apply the verifyToken middleware

module.exports = router;
