const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const twilioService = require('../services/twilioService');

// Function to send call and log to the database
const sendCall = async (req, res) => {
  const { customerName, phoneNumber, paymentAmount, dueDate, language } = req.body;

  try {
    // Send the call using Twilio
    const callSid = await twilioService.sendCall(customerName, phoneNumber, paymentAmount, dueDate, language);

    // Log the call to the database
    const callLog = await prisma.calls.create({
      data: {
        customerName,
        phoneNumber,
        paymentAmount,
        dueDate: new Date(dueDate),
        language,
        status: 'Initiated', // Set status to initiated when call is made
      },
    });

    res.status(200).json({ message: 'Call initiated successfully', callSid, callLog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate call' });
  }
};

// Function to get all call logs
const getCallLogs = async (req, res) => {
  try {
    const callLogs = await prisma.calls.findMany();
    res.status(200).json(callLogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch call logs' });
  }
};

module.exports = { sendCall, getCallLogs };
