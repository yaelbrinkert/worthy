require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');

router.get('/status', async (req, res) => {
  const token = req.cookies.usertoken;
  if (!token) {
    return res
      .status(400)
      .json({ isAuthenticated: false, message: 'Token is missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res
        .status(400)
        .json({ isAuthenticated: false, message: 'User is missing' });
    }
    res.status(200).json({ isAuthenticated: true, user });
  } catch (error) {
    return res
      .status(400)
      .json({ isAuthenticated: false, message: 'Non authorized' });
  }
});

module.exports = router;
