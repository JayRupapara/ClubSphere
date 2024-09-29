const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const vverifyToken = require('../middlewares/middleware.js');
require('dotenv').config();

const { student_verifyToken, club_verifyToken, checkRole } = vverifyToken;

// const { verifyToken} = vToken;
const bcrypt = require('bcrypt')


const app = express();
const router = express.Router();
router.use(express.json());

const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, // Use environment variable for the password
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
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

  // GET /club/members/:club_id
  router.get('/members', club_verifyToken, (req, res) => {
    const club_id = req.user.club_id; // Extract club_id from the token
  
    // Query to get club members where action is 'subscribed'
    const query = `
      SELECT 
        s.first_name, 
        s.last_name, 
        s.email, 
        MIN(se.event_id) AS join_date -- Assuming event_id proxies for the first event attended
      FROM 
        student s
      JOIN 
        student_event se 
      ON 
        s.student_id = se.student_id
      WHERE 
        se.club_id = ? 
        AND se.action = 'subscribed' -- Filter where action is 'subscribed'
      GROUP BY 
        s.student_id;
    `;
  
    connection.query(query, [club_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No subscribed members found for this club' });
      }
  
      // Return the results as a JSON response
      res.json({ members: results });
    });
  });
  
  
 
  


  // GET /club/events/:club_id
  router.get('/events', club_verifyToken, (req, res) => {
    const club_id = req.user.club_id; // Correctly extract the club_id

    // Query to get club events and participation count
    const query = `
      SELECT 
        ce.event_name, 
        ce.description, 
        ce.venue, 
        ce.event_date, 
        ce.event_start_time, 
        ce.event_end_time, 
        COUNT(se.student_id) AS participation_count
      FROM 
        club_event ce
      LEFT JOIN 
        student_event se 
      ON 
        ce.event_id = se.event_id
      WHERE 
        ce.club_id = ?
      GROUP BY 
        ce.event_id;
    `;

    connection.query(query, [club_id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'No events found for this club' });
      }

      // Return the event details
      res.json({ events: results });
    });
});


  





  // GET /club/past-events/:club_id
router.get('/past-events', club_verifyToken, (req, res) => {
    const { club_id } = req.user.club_id;
  
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



  router.post('/eventsByDateTime', club_verifyToken, (req, res) => {
    const { event_date, time } = req.body; // Extract event_date and time from the request body
  
    // Validate request
    if (!event_date || !time) {
      return res.status(400).json({ error: 'Missing event_date or time' });
    }
  
    // Query to get all events based on selected date and time across all clubs
    const query = `
      SELECT 
        ce.event_name, 
        ce.description, 
        ce.venue, 
        ce.event_date, 
        ce.event_start_time, 
        ce.event_end_time, 
        COUNT(se.student_id) AS participation_count,
        cu.name AS club_name
      FROM 
        club_event ce
      LEFT JOIN 
        student_event se ON ce.event_id = se.event_id
      LEFT JOIN 
        club_user cu ON ce.club_id = cu.club_id
      WHERE 
        ce.event_date = ?
        AND ? BETWEEN ce.event_start_time AND ce.event_end_time
      GROUP BY 
        ce.event_id;
    `;
  
    // Execute the query
    connection.query(query, [event_date, time], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No events found for the given date and time' });
      }
  
      // Return the filtered events
      res.json({ events: results });
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




  router.get('/clubDashboard', club_verifyToken, async (req, res) => {
    const { club_id } = req.user; // Extract club_id from token
  
    try {
      // Query 1: Total Hosted Events, Future Scheduled Events, Total Members, Next Event Start Time
      const query1 = `
        SELECT 
          (SELECT COUNT(*) FROM club_event WHERE club_id = ?) AS total_hosted_events,
          (SELECT COUNT(*) FROM club_event WHERE club_id = ? AND event_date > CURDATE()) AS future_scheduled_events,
          (SELECT COUNT(*) FROM student_event WHERE club_id = ? AND action = 'subscribed') AS total_members,
          (SELECT event_start_time FROM club_event WHERE club_id = ? AND event_date >= CURDATE() ORDER BY event_date ASC LIMIT 1) AS next_event_start_time;
      `;
  
      const [result1] = await new Promise((resolve, reject) => {
        connection.query(query1, [club_id, club_id, club_id, club_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
  
      // Query 2: Current and Upcoming Events
      const query2 = `
        SELECT event_name, event_start_time, event_end_time
        FROM club_event
        WHERE club_id = ? AND event_date >= CURDATE()
        ORDER BY event_date ASC;
      `;
  
      const upcomingEvents = await new Promise((resolve, reject) => {
        connection.query(query2, [club_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
  
      // Query 3: Preference Time Chart (1-24 Hours)
      const query3 = `
        SELECT HOUR(event_start_time) AS hour, COUNT(*) AS count
        FROM club_event
        WHERE club_id = ?
        GROUP BY HOUR(event_start_time);
      `;
  
      const preferenceTimeChart = await new Promise((resolve, reject) => {
        connection.query(query3, [club_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
  
      const totalEvents = preferenceTimeChart.reduce((acc, val) => acc + val.count, 0);
      const preferenceTimeData = preferenceTimeChart.map(row => ({
        hour: row.hour,
        percentage: totalEvents > 0 ? ((row.count / totalEvents) * 100).toFixed(2) : 0 // Prevent division by zero
      }));
  
      // Mock Query 4: Popular Domain (Real-Time Data, Mocked here)
      const popularDomains = [
        { domain: 'AI', percentage: 35 },
        { domain: 'Web Development', percentage: 30 },
        { domain: 'Data Science', percentage: 20 },
        { domain: 'Blockchain', percentage: 15 }
      ];
  
      // Query 5: Actual vs Target Participants
      const query5 = `
        SELECT 
          ce.event_name, 
          COUNT(se.student_id) AS actual_participants, 
          ce.participation_capacity AS target_participants
        FROM club_event ce
        LEFT JOIN student_event se ON ce.event_id = se.event_id
        WHERE ce.club_id = ?
        GROUP BY ce.event_id;
      `;
  
      const participantsChart = await new Promise((resolve, reject) => {
        connection.query(query5, [club_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
  
      // Query 6: Loyal Users, New Users, Unique Users (Monthly)
      const query6 = `
        SELECT 
          SUM(CASE WHEN MONTH(s.created_at) = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS new_users,
          SUM(CASE WHEN se.event_id IS NOT NULL THEN 1 ELSE 0 END) AS loyal_users,
          COUNT(DISTINCT s.student_id) AS unique_users
        FROM student s
        LEFT JOIN student_event se ON s.student_id = se.student_id AND se.club_id = ?
        WHERE s.student_id IN (
          SELECT student_id FROM student_event WHERE club_id = ?
        );
      `;
  
      const [userStats] = await new Promise((resolve, reject) => {
        connection.query(query6, [club_id, club_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
  
      // Combine all the data into one response
      res.json({
        dashboard: {
          total_hosted_events: result1.total_hosted_events,
          future_scheduled_events: result1.future_scheduled_events,
          total_members: result1.total_members,
          next_event_start_time: result1.next_event_start_time,
          upcoming_events: upcomingEvents,
          preference_time_chart: preferenceTimeData,
          popular_domain_percentage: popularDomains,
          participants_chart: participantsChart,
          user_stats: {
            loyal_users: userStats.loyal_users,
            new_users: userStats.new_users,
            unique_users: userStats.unique_users
          }
        }
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  

module.exports = router;