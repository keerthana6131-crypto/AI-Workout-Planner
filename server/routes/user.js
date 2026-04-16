// routes/user.js — POST /user endpoint — saves user data to MongoDB
const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

// POST /user
router.post('/', async (req, res) => {
  try {
    const { weight, height, age, goal, fitnessLevel, equipment, time } = req.body;

    // Basic server-side validation
    if (!weight || !height || !age || !goal || !fitnessLevel || !equipment || !time) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
      return res.status(400).json({ message: 'Weight, height, and age must be numbers.' });
    }

    // Create & save the document
    const newUser = new User({
      weight:       Number(weight),
      height:       Number(height),
      age:          Number(age),
      goal,
      fitnessLevel,
      equipment,
      time,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User data saved successfully! ✅',
      id: newUser._id,
    });
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
