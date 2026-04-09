// routes/user.js - POST /user endpoint
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /user - Save user fitness data to MongoDB
router.post('/', async (req, res) => {
  try {
    const { weight, height, age, goal, level, equipment, time } = req.body;

    // --- Basic server-side validation ---
    if (!weight || !height || !age || !goal || !level || !equipment || !time) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(time)) {
      return res.status(400).json({ message: 'Weight, height, age, and time must be numbers.' });
    }

    // Create a new User document
    const newUser = new User({
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      goal,
      level,
      equipment,
      time: Number(time),
    });

    // Save to MongoDB
    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User data saved successfully', id: newUser._id });
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
