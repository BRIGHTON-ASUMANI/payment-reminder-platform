const express = require('express');
const { sendCall, getCallLogs } = require('../controllers/callController');

const router = express.Router();

/**
 * @openapi
 * /api/call:
 *   post:
 *     summary: Send a call to the customer and log it in the database
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
 */
router.post('/call', sendCall);

/**
 * @openapi
 * /api/call/logs:
 *   get:
 *     summary: Get all call logs
 *     responses:
 *       200:
 *         description: Call logs retrieved successfully
 */
router.get('/call/logs', getCallLogs);

module.exports = router;
