// Import required modules
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Create connection pool for MySQL
const pool = mysql.createPool({
    port : process.env.db_port,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "Z",
    // port: process.env.DB_PORT,
    // socketPath: process.env.DB_SOCKET_PATH // Ensure the correct path variable
});

// Create express app
const app = express();
const router = express.Router();

app.use(cookieParser());

// Middleware to parse JSON bodies
router.use(express.json());

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
  };

// 3. Student Sign In
router.post('/student_sign_in', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find club by email
        const students = await query('SELECT * FROM student WHERE email = ?', [email]);
        if (students.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const student = students[0];
        console.log(student.student_id);
        
        // console.log(password);
        // console.log(student.password);
        
        
        

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { student_id: student.student_id, email: student.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        

        res.json({ message: 'student signed in successfully', token });
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
        const clubs = await query('SELECT * FROM club_user WHERE email = ?', [email]);
        if (clubs.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const club = clubs[0];

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, club.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { club_id: club.club_id, email: club.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Club signed in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;