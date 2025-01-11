// controllers/callController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const twilioService = require('../services/twilioService');

const sendCall = async (req, res) => {
  const { customerName, phoneNumber, paymentAmount, dueDate, language } = req.body;
  console.log('Received data:', req.body);

  try {
    // Validate input
    if (!customerName || !phoneNumber || !paymentAmount || !dueDate || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send the call using Twilio
    const callSid = await twilioService.sendCall(
      customerName, 
      phoneNumber, 
      paymentAmount, 
      dueDate, 
      language
    );

    // Log the call to the database
    const callLog = await prisma.calls.create({
      data: {
        customerName,
        phoneNumber,
        paymentAmount,
        dueDate: new Date(dueDate),
        language,
        status: 'Initiated',
        callSid
      },
    });

    res.status(200).json({ 
      message: 'Call initiated successfully',
      callSid,
      callLogId: callLog.id
    });

  } catch (error) {
    console.error('Error creating call:', error);
    res.status(500).json({ 
      error: 'Failed to initiate call',
      details: error.message 
    });
  }
};

const getCallLogs = async (req, res) => {
  try {
    const callLogs = await prisma.calls.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Fetch additional details from Twilio for each call
    const enhancedLogs = await Promise.all(
      callLogs.map(async (log) => {
        if (log.callSid) {
          try {
            const twilioCall = await twilioService.getCallDetails(log.callSid);
            return {
              ...log,
              duration: twilioCall.duration,
              status: twilioCall.status,
              price: twilioCall.price
            };
          } catch (error) {
            console.error(`Error fetching details for call ${log.callSid}:`, error);
            return log;
          }
        }
        return log;
      })
    );

    res.status(200).json(enhancedLogs);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).json({ error: 'Failed to fetch call logs' });
  }
};

module.exports = { sendCall, getCallLogs };