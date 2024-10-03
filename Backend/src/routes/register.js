const express = require("express");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const vverifyToken = require("./../middlewares/middleware.js");
const moment = require("moment");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

require("dotenv").config();

const router = express.Router();

const secret = process.env.JWT_SECRET || "yourSecretKey";

const { verifyToken, checkRole } = vverifyToken;

router.use(express.json());
router.use(cookieParser());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        require: false
    },
});

pool.connect((err) => {
    if (err) {
        console.error("Error connecting to PostgreSQL:", err.stack);
        return;
    }
    console.log("Connected to PostgreSQL");
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const query = async (text, params) => {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
};

// 1. Student Register
// 1. Student Register
router.post('/student_register', async (req, res) => {
    try {
        const {
            first_name, middle_name, last_name, gender, dob, phone_number,
            address, college_name, year_of_study, branch, course,
            interested_in, skills_interest, reason_for_joining_club,
            previous_club_experience, email, password, profile_url
        } = req.body;

        // Basic validation
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if email already exists
        const existingUser = await query('SELECT * FROM student WHERE email = $1', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash password (optional if not already hashed)
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Handle profile_url if not provided
        const profileUrl = profile_url || '';

        // Insert new student record
        const result = await query(
            `INSERT INTO student (
          first_name, middle_name, last_name, gender, dob, phone_number, 
          address, college_name, year_of_study, branch, course, interested_in, 
          skills_interest, reason_for_joining_club, previous_club_experience, 
          email, password, profile_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
        RETURNING student_id`,
            [
                first_name, middle_name, last_name, gender, dob, phone_number, address,
                college_name, year_of_study, branch, course, interested_in,
                skills_interest, reason_for_joining_club, previous_club_experience,
                email, password, profileUrl // Pass all values correctly
            ]
        );

        res.status(200).json({ message: 'Student registered successfully', student_id: result[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 2. Club Register
router.post('/club_register', async (req, res) => {
    try {
      const {
        name, category, description, president_name, vice_president_name,
        email, phone_number, password
      } = req.body;
  
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Check if email already exists
      const existingClub = await query('SELECT * FROM club_user WHERE email = $1', [email]);
      if (existingClub.length > 0) {
        return res.status(409).json({ message: 'Email already registered' });
      }
  
      // Hash password
      // const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert new club without club_id
      const result = await query(
        'INSERT INTO club_user (name, category, description, president_name, vice_president_name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING club_id',
        [name, category, description, president_name, vice_president_name, email, phone_number, password]
      );
  
      res.status(200).json({ message: 'Club registered successfully', club_id: result[0].club_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;