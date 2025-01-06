const jwt = require('jsonwebtoken');

// Helper function to generate tokens (for testing)
const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Helper function to decode token without verification (for debugging)
const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};

const verifyToken = (req, res, next) => {
  try {
    // Check if JWT_SECRET is set first
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment variables');
      return res.status(500).json({
        error: 'Internal server configuration error'
      });
    }

    // Get the authorization header
    const authHeader = req.header('Authorization');
    
    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        error: 'Access denied. No Authorization header provided.'
      });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        error: 'Invalid Authorization format. Use: Bearer <token>'
      });
    }

    const token = parts[1];

    // Add debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Token being verified:', token);
      console.log('Decoded token (without verification):', decodeToken(token));
      console.log('JWT_SECRET length:', process.env.JWT_SECRET.length);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    next();
  } catch (error) {
    // Provide more specific error messages
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token has expired'
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token format or signature',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    
    // Log unexpected errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Token verification error:', error);
    }
    
    return res.status(401).json({
      error: 'Token validation failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { verifyToken, generateToken, decodeToken };