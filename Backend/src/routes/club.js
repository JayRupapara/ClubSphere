const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const vToken = require('../middlewares/middleware.js');
require('dotenv').config();
const { verifyToken, checkRole } = vToken;
const bcrypt = require('bcrypt')

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