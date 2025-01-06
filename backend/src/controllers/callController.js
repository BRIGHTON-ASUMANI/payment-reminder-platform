const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const twilioService = require('../services/twilioService');

// Function to send call and log to the database
const sendCall = async (req, res) => {
  const { customerName, phoneNumber, paymentAmount, dueDate, language } = req.body;

  console.log('Received data:', req.body); // Add this to check if fields are present

  try {
    // Send the call using Twilio (this line is commented out)
    // const callSid = await twilioService.sendCall(customerName, phoneNumber, paymentAmount, dueDate, language);

    // Log the call to the database
    const callLog = await prisma.calls.create({
      data: {
        customerName,
        phoneNumber,
        paymentAmount,
        dueDate: new Date(dueDate), 
        language,
        status: 'Initiated',
      },
    });

    res.status(200).json({ message: 'Call initiated successfully'});
  } catch (error) {
    console.error('Error creating call:', error); 
    res.status(500).json({ error: 'Failed to initiate call' });
  }
};


// Function to get all call logs
const getCallLogs = async (req, res) => {
  console.log('Authorization header:', req.headers['authorization']);
  try {
    const callLogs = await prisma.calls.findMany();
    res.status(200).json(callLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch call logs' });
  }
};


module.exports = { sendCall, getCallLogs };
