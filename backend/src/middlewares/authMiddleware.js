// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and authenticate the user
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  });
};

module.exports = { verifyToken };  // Export verifyToken as a named function
