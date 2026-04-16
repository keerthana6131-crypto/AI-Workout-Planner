// models/User.js — Mongoose schema for user fitness data
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    weight:       { type: Number, required: [true, 'Weight is required'],       min: 1 },
    height:       { type: Number, required: [true, 'Height is required'],       min: 1 },
    age:          { type: Number, required: [true, 'Age is required'],          min: 1, max: 120 },
    goal:         { type: String, required: [true, 'Goal is required'],         trim: true },
    fitnessLevel: { type: String, required: [true, 'Fitness level is required'],trim: true },
    equipment:    { type: String, required: [true, 'Equipment is required'],    trim: true },
    time:         { type: String, required: [true, 'Time is required'],         trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
