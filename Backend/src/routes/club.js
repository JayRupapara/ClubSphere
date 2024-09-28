const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const vverifyToken = require('../middlewares/middleware.js');
require('dotenv').config();
<<<<<<< HEAD
const { student_verifyToken, club_verifyToken, checkRole } = vverifyToken;
=======
const { verifyToken, checkRole } = vToken;
const bcrypt = require('bcrypt')
>>>>>>> 3df0bf04d9a8ed372ba3dc03c4414b76500e247d

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

<<<<<<< HEAD
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
  
=======
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
          if (error) {
              return reject(error);
          }
          resolve(results);
      });
  });
};
>>>>>>> 3df0bf04d9a8ed372ba3dc03c4414b76500e247d

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
  

// Route to add a new club-member

router.post('/club_member_register', async (req, res) => {
    try {
        const {
            name,role,skills_interest,email,phone_number,password
        } = req.body;
  
        // Basic validation
        if (!name || !role || !email || !phone_number || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
  
        // Check if email already exists
        const existingUser = await query('SELECT * FROM club_member WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }
  
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Insert new club member
        const result = await query(
            'INSERT INTO club_member (name,role,skills_interest,email,phone_number,password) VALUES (?, ?, ?, ?, ?, ?)',
            [name,role,skills_interest,email,phone_number, hashedPassword]
        );
  
        res.status(201).json({ message: 'Club Member registered successfully', member_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });


// Route to add a new club even registration

router.post('/club_event_register', async (req, res) => {
    try {
        const {
            event_name,event_type,description,event_banner,participation_capacity,registration_last_date,event_date,event_start_time,event_end_time,venue
        } = req.body;
  
        // Basic validation
        if (!event_name || !event_type || !participation_capacity || !registration_last_date || !event_date || !event_start_time || !event_end_time ||!venue) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if event name already exist
        const existingEvent = await query('SELECT * FROM club_event WHERE event_name = ?', [event_name]);
        if (existingEvent.length > 0) {
            return res.status(409).json({ message: 'Event already registered' });
        }
  
        // Insert new event
        const result = await query(
            'INSERT INTO club_event (event_name,event_type,description,event_banner,participation_capacity,registration_last_date,event_date,event_start_time,event_end_time,venue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [event_name,event_type,description,event_banner,participation_capacity,registration_last_date,event_date,event_start_time,event_end_time,venue]
        );
  
        res.status(201).json({ message: 'New Club Event registered successfully', event_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;