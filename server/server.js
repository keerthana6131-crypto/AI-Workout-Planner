// server.js — Main Express entry point
require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/user');

const app = express();

// ── Connect to MongoDB ──────────────────────────────────────────────────
connectDB();

// ── Middleware ──────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────
app.use('/user', userRoutes);

// Health check
app.get('/', (_req, res) => {
  res.json({ message: '🏋️ AI Home Workout + Diet Planner API is running!' });
});

// ── Start Server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
