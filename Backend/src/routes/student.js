const express = require("express");
const mysql = require("mysql");
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

const connection = mysql.createConnection({
  port : process.env.port,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "Z",
  // socketPath: process.env.DB_SOCKET_PATH,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id", connection.threadId);
});

// API to get student event details with authorization
router.get('/events', student_verifyToken, async (req, res) => {
  const studentId = req.user.student_id; // Get student_id from the token

  try {
      // Execute the query and store the result
      const results = await connection.query(
          `SELECT 
              c.name, 
              e.event_name, 
              e.description, 
              e.venue, 
              e.event_start_time, 
              e.event_date,
              TIMEDIFF(e.event_end_time, e.event_start_time) AS duration
          FROM 
              student_event se
          JOIN 
              club_event e ON se.event_id = e.event_id
          JOIN 
              club_user c ON e.club_id = c.club_id
          WHERE 
              se.student_id = ?`, 
          [studentId]
      );

      // Check if results exist
      if (!Array.isArray(results) || results.length === 0) {
          return res.status(404).json({ message: 'No events found for this student.' });
      }

      // Send the results
      res.status(200).json(results);  // Adjusted for the structure returned by `connection.query()`
  } catch (error) {
      console.error('Error fetching events:', error);  // Log the error for debugging
      res.status(500).json({ message: 'Internal server error' });
  }
});  //tested



router.get('/getClubsByStudentEvent', student_verifyToken, (req, res) => {
  const student_id = req.user.student_id;

  // Validate request
  if (!student_id) {
    return res.status(400).json({ error: 'Missing student_id' });
  }

  // Query to get all club_id and club_name associated with the student
  const query = `
    SELECT cu.club_id, cu.name AS club_name
    FROM student_event se
    JOIN club_user cu ON se.club_id = cu.club_id
    WHERE se.student_id = ?;
  `;

  // Execute the query
  connection.query(query, [student_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Check if any result is found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No clubs found for the given student' });
    }
    // console.log(results);
    
    // Send all clubs as the response
    res.json({ clubs: results });
  });
});  // tested


// GET /student/club-notifications
router.get('/notifications', student_verifyToken, (req, res) => {
  const student_id = req.user.student_id;

  // Query to get club notifications
  const query = `
    SELECT cu.club_id, cu.name AS club_name, MAX(ce.registration_last_date) AS last_registration_date
    FROM student_event se
    JOIN club_event ce ON se.event_id = ce.event_id
    JOIN club_user cu ON se.club_id = cu.club_id
    WHERE se.student_id = ?
    GROUP BY cu.club_id, cu.name;
  `;

  connection.query(query, [student_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'No clubs found for this student' });

    res.json({ clubs: results });
  });
});



// GET /student/settings
router.get('/student/settings', student_verifyToken, (req, res) => {
  const student_id = req.user.student_id;

  // Query to get student settings
  const query = `SELECT * FROM student WHERE student_id = ?;`;

  connection.query(query, [student_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'Student not found' });

    res.json({ student: results[0] });
  });
});








module.exports = router;