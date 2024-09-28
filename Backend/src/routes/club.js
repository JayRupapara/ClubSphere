

const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const vverifyToken = require('../middlewares/middleware.js');
require('dotenv').config();
const { student_verifyToken, club_verifyToken, checkRole } = vverifyToken;

const app = express();
const router = express.Router();
router.use(express.json());

const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, // Use environment variable for the password
        database: process.env.DB_NAME
        // port: process.env.DB_PORT,
        // path: process.env.DB_SOCKET_PATH
    });

// Route to add a new user
// GET /club/dashboard/:club_id
router.get('/club/dashboard/:club_id', club_verifyToken, (req, res) => {
    const { club_id } = req.params;
  
    // Query for club dashboard details
    const query = `
      SELECT cu.name AS club_name, 
             COUNT(DISTINCT ce.event_id) AS total_hosted_events, 
             COUNT(CASE WHEN ce.event_date >= CURDATE() THEN 1 END) AS scheduled_events,
             COUNT(DISTINCT se.student_id) AS total_members,
             MIN(ce.event_date) AS next_event_time
      FROM club_user cu
      LEFT JOIN club_event ce ON cu.club_id = ce.club_id
      LEFT JOIN student_event se ON cu.club_id = se.club_id
      WHERE cu.club_id = ?;
    `;
  
    connection.query(query, [club_id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ message: 'Club not found' });
  
      res.json({ dashboard: results[0] });
    });
  });
  

  // GET /club/members/:club_id
router.get('/club/members/:club_id', club_verifyToken, (req, res) => {
    const { club_id } = req.params;
  
    // Query to get club members
    const query = `
      SELECT s.first_name, s.last_name, s.email, MIN(se.event_id) AS join_date
      FROM student s
      JOIN student_event se ON s.student_id = se.student_id
      WHERE se.club_id = ?
      GROUP BY s.student_id;
    `;
  
    connection.query(query, [club_id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ message: 'No members found for this club' });
  
      res.json({ members: results });
    });
  });
 
  


  // GET /club/events/:club_id
router.get('/club/events/:club_id', club_verifyToken, (req, res) => {
    const { club_id } = req.params;
  
    // Query to get club events
    const query = `
      SELECT ce.event_name, ce.description, ce.venue, ce.event_date, ce.event_start_time, ce.event_end_time, 
             COUNT(se.student_id) AS participation_count
      FROM club_event ce
      LEFT JOIN student_event se ON ce.event_id = se.event_id
      WHERE ce.club_id = ?
      GROUP BY ce.event_id;
    `;
  
    connection.query(query, [club_id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ message: 'No events found for this club' });
  
      res.json({ events: results });
    });
  });

  





  // GET /club/past-events/:club_id
router.get('/club/past-events/:club_id', club_verifyToken, (req, res) => {
    const { club_id } = req.params;
  
    // Query to get past events
    const query = `
      SELECT event_name, event_date 
      FROM club_event 
      WHERE club_id = ? AND event_date < CURDATE()
      ORDER BY event_date DESC;
    `;
  
    connection.query(query, [club_id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ message: 'No past events found for this club' });
  
      res.json({ past_events: results });
    });
  });
  

module.exports = router;