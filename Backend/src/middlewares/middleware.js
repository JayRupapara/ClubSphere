// Import required modules
const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // Import the pg Pool class
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is loaded correctly

// Create a new PostgreSQL pool
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        require : false
      } // Ensure this is specified in your .env file
    // ssl: { rejectUnauthorized: false }, // Uncomment if SSL is required
});

// Middleware function to verify JWT token for students
const student_verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded.student_id);

        pool.query('SELECT * FROM student WHERE student_id = $1', [decoded.student_id], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            req.user = result.rows[0]; // Attach user information to the request object
            next();
        });
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

// Middleware function to verify JWT token for club users
const club_verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        pool.query('SELECT * FROM club_user WHERE club_id = $1', [decoded.club_id], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            req.user = result.rows[0]; // Attach user information to the request object
            next();
        });
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

// Middleware to check if user has the required role
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};

module.exports = { student_verifyToken, club_verifyToken, checkRole };