const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Create connection pool for PostgreSQL
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

// Create express app
const app = express();
const router = express.Router();

app.use(cookieParser());

// Middleware to parse JSON bodies
router.use(express.json());

const query = async (text, params) => {
    const client = await pool.connect();
    try {
        return await client.query(text, params);
    } finally {
        client.release();
    }
};

// 3. Student Sign In
router.post('/student_sign_in', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find student by email
        const result = await query('SELECT * FROM student WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const student = result.rows[0];

        // Compare plain text passwords
        if (password !== student.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { student_id: student.student_id, email: student.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Student signed in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 4. Club Sign In
router.post('/club_sign_in', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find club by email
        const result = await query('SELECT * FROM club_user WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const club = result.rows[0];

        // Compare plain text passwords
        if (password !== club.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { club_id: club.club_id, email: club.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // res.json({ message: 'Club signed in successfully', token });
        res.status(200).json({ message: 'Club signed in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;