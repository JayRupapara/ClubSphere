const express = require("express");
const { Pool } = require("pg"); // PostgreSQL
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const vverifyToken = require("./../middlewares/middleware.js");
const moment = require("moment");
const nodemailer = require('nodemailer');

require("dotenv").config();

const router = express.Router();

const secret = process.env.JWT_SECRET || "yourSecretKey";

const { student_verifyToken, club_verifyToken, checkRole } = vverifyToken;

router.use(express.json());
router.use(cookieParser());

// Create a PostgreSQL connection pool
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
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.stack);
    return;
  }
  console.log("Connected to PostgreSQL");
  release();
});

// API to get student event details with authorization
router.get('/events', student_verifyToken, async (req, res) => {
  const studentId = req.user.student_id;

  try {
    const query = `
      SELECT 
        c.name, 
        e.event_name, 
        e.description, 
        e.venue, 
        e.event_start_time, 
        e.event_date,
        EXTRACT(EPOCH FROM (e.event_end_time - e.event_start_time)) / 3600 AS duration
      FROM 
        student_event se
      JOIN 
        club_event e ON se.event_id = e.event_id
      JOIN 
        club_user c ON e.club_id = c.club_id
      WHERE 
        se.student_id = $1
    `;

    const { rows: results } = await pool.query(query, [studentId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No events found for this student.' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/getClubsByStudentEvent', student_verifyToken, async (req, res) => {
  const student_id = req.user.student_id;

  if (!student_id) {
    return res.status(400).json({ error: 'Missing student_id' });
  }

  const query = `
    SELECT cu.club_id, cu.name AS club_name
    FROM student_event se
    JOIN club_user cu ON se.club_id = cu.club_id
    WHERE se.student_id = $1;
  `;

  try {
    const { rows: results } = await pool.query(query, [student_id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No clubs found for the given student' });
    }

    res.json({ clubs: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/notifications', student_verifyToken, async (req, res) => {
  const student_id = req.user.student_id;

  const query = `
    SELECT cu.club_id, cu.name AS club_name, MAX(ce.registration_last_date) AS last_registration_date
    FROM student_event se
    JOIN club_event ce ON se.event_id = ce.event_id
    JOIN club_user cu ON se.club_id = cu.club_id
    WHERE se.student_id = $1
    GROUP BY cu.club_id, cu.name;
  `;

  try {
    const { rows: results } = await pool.query(query, [student_id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No clubs found for this student' });
    }

    res.json({ clubs: results });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/student/settings', student_verifyToken, async (req, res) => {
  const student_id = req.user.student_id;

  const query = `SELECT * FROM student WHERE student_id = $1;`;

  try {
    const { rows: results } = await pool.query(query, [student_id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ student: results[0] });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;