// models/User.js - Mongoose schema for user fitness data
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // User's weight in kilograms
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      min: [1, 'Weight must be positive'],
    },

    // User's height in centimeters
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: [1, 'Height must be positive'],
    },

    // User's age in years
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [1, 'Age must be positive'],
    },

    // Fitness goal
    goal: {
      type: String,
      required: [true, 'Goal is required'],
      enum: ['muscle gain', 'fat loss', 'stamina', 'hybrid'],
    },

    // Current fitness level
    level: {
      type: String,
      required: [true, 'Fitness level is required'],
      enum: ['beginner', 'intermediate', 'advanced'],
    },

    // Available equipment
    equipment: {
      type: String,
      required: [true, 'Equipment is required'],
      enum: ['none', 'resistance bands', 'dumbbells'],
    },

    // Time available per day in minutes
    time: {
      type: Number,
      required: [true, 'Time available is required'],
      min: [1, 'Time must be at least 1 minute'],
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
