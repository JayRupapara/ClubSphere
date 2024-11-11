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
router.get('/events', async (req, res) => {
  try {
    const query = `
      SELECT 
        cu.name AS club_name, 
        e.event_name, 
        e.description, 
        e.venue, 
        e.event_start_time, 
        e.event_date,
        EXTRACT(EPOCH FROM (e.event_end_time - e.event_start_time)) / 3600 AS duration
      FROM 
        club_event e
      JOIN 
        club_user cu ON e.club_id = cu.club_id
    `;

    const { rows: results } = await pool.query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No events found.' });
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



router.get('/getClubDetailsByStudentEvent', student_verifyToken, async (req, res) => {
  const student_id = req.user.student_id;

  if (!student_id) {
    return res.status(400).json({ error: 'Missing student_id' });
  }

  const query = `
    SELECT 
      cu.club_id, 
      cu.name AS club_name,
      COUNT(DISTINCT cm.member_id) AS total_members, 
      COUNT(DISTINCT ce.event_id) AS total_posted_events,
      (
        SELECT COUNT(DISTINCT se.student_id)
        FROM student_event se
        WHERE se.club_id = cu.club_id
      )::float / NULLIF(COUNT(DISTINCT cm.member_id), 0) AS active_rate
    FROM 
      club_user cu
    LEFT JOIN 
      club_member cm ON cu.club_id = cm.club_id
    LEFT JOIN 
      club_event ce ON cu.club_id = ce.club_id
    GROUP BY 
      cu.club_id, cu.name;
  `;

  try {
    const { rows: results } = await pool.query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No clubs found' });
    }

    // Calculate popularity based on the given weights
    const weightedResults = results.map(club => {
      const { total_members, total_posted_events, active_rate } = club;

      // Normalize values if necessary
      const normalizedMembers = total_members / 100; // Assuming max possible members is 100 for normalization
      const normalizedEvents = total_posted_events / 50; // Assuming max possible events is 50 for normalization
      const normalizedActiveRate = active_rate || 0;

      // Weights (adjust as per your preference)
      const weightMembers = 0.4;
      const weightEvents = 0.3;
      const weightActiveRate = 0.3;

      // Calculate popularity
      const popularity =
        weightMembers * normalizedMembers +
        weightEvents * normalizedEvents +
        weightActiveRate * normalizedActiveRate;

      return {
        ...club,
        popularity: popularity.toFixed(2) // Limit to 2 decimal places
      };
    });

    res.json({ clubs: weightedResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;