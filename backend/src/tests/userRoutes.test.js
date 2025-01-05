const request = require('supertest');
const express = require('express');
const { sendCall, getCallLogs } = require('../controllers/callController');
const { verifyToken } = require('../middlewares/authMiddleware');
const app = express();


app.use(express.json());
app.post('/api/call', verifyToken, sendCall);
app.get('/api/call/logs', verifyToken, getCallLogs);

// Mock token
const mockToken = 'mock token'; 

describe('Test /api/call routes', () => {
  it('should initiate a call and log it', async () => {
    const response = await request(app)
      .post('/api/call')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        customerName: 'John Doe',
        phoneNumber: '1234567890',
        paymentAmount: 100,
        dueDate: '2025-01-01T00:00:00Z',
        language: 'en',
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Call initiated successfully');
  });

  it('should fetch call logs', async () => {
    const response = await request(app)
      .get('/api/call/logs')
      .set('Authorization', `Bearer ${mockToken}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
