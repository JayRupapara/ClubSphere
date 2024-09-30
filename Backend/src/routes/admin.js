// Import required modules
const express = require('express');
const app = express();
const router = express.Router();
const { Pool } = require('pg'); // Import the Pool class from pg
const jwt = require('jsonwebtoken');
require('dotenv').config();
const moment = require('moment');
const vverifyToken = require('../middlewares/middleware.js');

// Secret key for JWT (stored securely in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to parse JSON bodies
app.use(express.json());

const { student_verifyToken, club_verifyToken, checkRole } = vverifyToken;

// Database connection pool

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      require : false
    },
  });
// Test the database connection
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.stack);
        return;
    }
    console.log('Connected to PostgreSQL');
});

// Export the router
module.exports = router;