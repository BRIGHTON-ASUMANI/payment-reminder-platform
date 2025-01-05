// src/services/twilioService.js
const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
const prisma = require('@prisma/client');

const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const prismaClient = new prisma.PrismaClient();

// Function to send a call reminder and store the call in the database
const sendCall = async (userId, customerName, phoneNumber, paymentAmount, dueDate, language) => {
  try {
    // Create a dynamic message based on the provided fields
    const message = `Hello ${customerName}, this is a reminder that you have a payment of $${paymentAmount} due on ${new Date(dueDate).toLocaleDateString()}. Please make sure to pay on time.`;

    // Construct the TwiML response
    const twiml = `<Response>
                    <Say voice="alice" language="${language}">
                      ${message}
                    </Say>
                  </Response>`;

    // Make the call using Twilio
    const call = await client.calls.create({
      to: phoneNumber,
      from: TWILIO_PHONE_NUMBER,
      twiml: twiml,
    });

    // Save call details to the database
    const savedCall = await prismaClient.call.create({
      data: {
        customerName,
        phoneNumber,
        paymentAmount,
        dueDate: new Date(dueDate),
        language,
        status: 'pending',  
        userId: userId,
      },
    });

    return { callSid: call.sid, savedCall }; // Return call SID and saved call details from DB
  } catch (error) {
    console.error("Error sending call:", error);
    throw error;
  }
};

module.exports = { sendCall };
