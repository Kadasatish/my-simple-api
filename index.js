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

// Protected API route
app.post('/api/protected', authenticate, post(req, res) => {
  res.json({ message: 'This is a protected data!' });
});

// Vercel needs module exports
module.exports = app;
