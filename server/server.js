// server.js - Main Express application entry point
require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/user');

const app = express();

// ----- Connect to MongoDB -----
connectDB();

// ----- Middleware -----
// Enable CORS so the React frontend (localhost:5173) can call this API
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));

// Parse incoming JSON request bodies
app.use(express.json());

// ----- Routes -----
// Mount user routes at /user
app.use('/user', userRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: '🏋️ AI Fitness Planner API is running!' });
});

// ----- Start Server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
