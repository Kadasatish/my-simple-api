const express = require('express');
const app = express();

app.use(express.json());

// Simple in-memory user for demo (in practice, use a database)
const users = {
  username: 'admin',
  password: '123456'
};

// Middleware for basic authentication
const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  if (username === users.username && password === users.password) {
    next(); // Allow access
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Root route for browser access
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API! Use /api/public for public data or /api/protected for authenticated data.' });
});

// Public route (no authentication needed)
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is public data, no authentication needed!' });
});

// Protected API route (requires authentication)
app.post('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected data!' });
});

// Vercel needs module exports
module.exports = app;
