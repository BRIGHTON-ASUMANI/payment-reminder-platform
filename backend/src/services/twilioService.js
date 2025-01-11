const twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
require('dotenv').config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

class TwilioService {
  constructor() {
    this.client = client;
  }

  generateTwiML(customerName, paymentAmount, dueDate, language) {
    const twiml = new VoiceResponse();
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(paymentAmount);

    const formattedDate = new Date(dueDate).toLocaleDateString(
      language === 'french' ? 'fr-FR' : 'en-US',
      { month: 'long', day: 'numeric', year: 'numeric' }
    );

    // Set voice and message based on language
    const voiceConfig = {
      voice: language === 'french' ? 'Polly.Celine' : 'Polly.Joanna',
      language: language === 'french' ? 'fr-FR' : 'en-US'
    };

    const message = language === 'french'
      ? `Bonjour ${customerName}, ceci est un rappel de paiement. Vous avez un paiement de ${formattedAmount} dû le ${formattedDate}. Veuillez effectuer le paiement avant la date d'échéance. Merci.`
      : `Hello ${customerName}, this is a payment reminder. You have a payment of ${formattedAmount} due on ${formattedDate}. Please ensure to make the payment before the due date. Thank you.`;

    twiml.say(voiceConfig, message);
    twiml.pause({ length: 2 });
    
    // Repeat important information
    const repeatMessage = language === 'french'
      ? `Je répète: Vous avez un paiement de ${formattedAmount} dû le ${formattedDate}. Merci.`
      : `I repeat: You have a payment of ${formattedAmount} due on ${formattedDate}. Thank you.`;
    
    twiml.say(voiceConfig, repeatMessage);

    return twiml.toString();
  }

  async sendCall(customerName, phoneNumber, paymentAmount, dueDate, language) {
    try {
      const twimlResponse = this.generateTwiML(customerName, paymentAmount, dueDate, language);
      
      const call = await this.client.calls.create({
        twiml: twimlResponse,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
        statusCallback: `${process.env.BASE_URL}/api/call/status`,
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        statusCallbackMethod: 'POST'
      });

      return call.sid;
    } catch (error) {
      console.error('Twilio call error:', error);
      throw new Error(`Failed to initiate Twilio call: ${error.message}`);
    }
  }

  async getCallDetails(callSid) {
    try {
      return await this.client.calls(callSid).fetch();
    } catch (error) {
      console.error('Error fetching call details:', error);
      throw error;
    }
  }
}

module.exports = new TwilioService();