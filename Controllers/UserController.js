const express = require('express');
const User = require('./User'); // Assuming User class is in the same directory
const bcrypt = require('bcrypt'); // For password hashing (install with npm install bcrypt)
const jwt = require('jsonwebtoken'); // For JWT (install with npm install jsonwebtoken)
const jwtSecret = 'your_strong_jwt_secret'; // Replace with a long and random string
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.getByEmail(email);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare password hashes
      const isPasswordValid = await User.comparePasswprd(email, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const payload = { userId: user.id, role: user.role };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded; // Attach decoded user info to the request object
      next();
    } catch (error) {
      console.error('Error verifying JWT:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };


  // Update a user (use req.user.userId for identification)
  router.put('/users/:userId', verifyJWT, async (req, res) => {
    const userId = req.params.userId;
    const updatedUser = req.body;
  
    // ... Update logic using userId and updatedUser object
  });
  
  // ... Other protected routes for user management
  