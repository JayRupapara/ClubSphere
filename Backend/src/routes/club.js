const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const vverifyToken = require('../middlewares/middleware.js');
require('dotenv').config();

const { student_verifyToken, club_verifyToken, checkRole } = vverifyToken;

const bcrypt = require('bcrypt')

const app = express();
const router = express.Router();
router.use(express.json());

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

const query = async (text, params) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

// GET /club/dashboard/:club_id
router.get('/club/dashboard/:club_id', club_verifyToken, async (req, res) => {
  const { club_id } = req.params;

  // Query for club dashboard details
  const queryText = `
      SELECT 
          cu.name AS club_name, 
          COUNT(DISTINCT ce.event_id) AS total_hosted_events, 
          COUNT(*) FILTER (WHERE ce.event_date >= CURRENT_DATE) AS scheduled_events,
          COUNT(DISTINCT cm.member_id) AS total_members,
          MIN(ce.event_date) AS next_event_time
      FROM 
          club_user cu
      LEFT JOIN 
          club_event ce ON cu.club_id = ce.club_id
      LEFT JOIN 
          club_member cm ON cu.club_id = cm.club_id
      WHERE 
          cu.club_id = $1
      GROUP BY 
          cu.name;
  `;

  const lastMonthEvents = `
    SELECT 
        COUNT(CASE WHEN DATE_TRUNC('month', ce.event_date) = DATE_TRUNC('month', CURRENT_DATE) THEN 1 END) AS current_month_participate,
        COUNT(CASE WHEN DATE_TRUNC('month', ce.event_date) = DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' THEN 1 END) AS last_month_participate
    FROM 
        student_event se
    JOIN 
        club_event ce ON se.event_id = ce.event_id
    WHERE 
        ce.club_id = $1;
  `;

  // Query for total participants
  const totalParticipantsQuery = `
    SELECT COUNT(*) AS total_participants
    FROM student_event se
    WHERE se.club_id = $1;
  `;

  // Query for upcoming events
  const upcomingEventsQuery = `
    SELECT COUNT(*) AS upcoming_events
    FROM club_event
    WHERE club_id = $1 AND event_date > CURRENT_DATE;
  `;

  // Query for new users (students who joined in the last 30 days)
  // const newUsersQuery = `
  //   SELECT COUNT(*) AS new_users
  //   FROM club_user
  //   WHERE DATEDIFF(CURRENT_DATE, created_at) <= 30;
  // `;

  try {
    // Execute all queries concurrently
    const result = await query(queryText, [club_id]);
    const result1 = await query(lastMonthEvents, [club_id]);
    const result2 = await query(totalParticipantsQuery, [club_id]);
    const result3 = await query(upcomingEventsQuery, [club_id]);
    // const result4 = await query(newUsersQuery);

    // Ensure that the result contains data before accessing
    if (result.rows.length === 0) return res.status(404).json({ message: 'Club not found' });

    const dashboardData = result.rows[0];
    const lastMonthData = result1.rows[0];
    const totalParticipantsData = result2.rows[0];
    const upcomingEventsData = result3.rows[0];
    // const newUsersData = result4.rows[0];

    // Check if any query result is undefined
    if (!dashboardData || !lastMonthData || !totalParticipantsData || !upcomingEventsData) {
      return res.status(500).json({ error: 'Some data is missing from the database' });
    }

    // Return the data as a JSON response
    res.json({
      dashboard: dashboardData,
      lastMonthEvents: lastMonthData,
      totalParticipants: totalParticipantsData,
      upcomingEvents: upcomingEventsData,
      // newUsers: newUsersData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /club/members
router.get('/members', club_verifyToken, async (req, res) => {
  const club_id = req.user.club_id;

  const queryText = `
    SELECT 
      s.first_name, 
      s.last_name, 
      s.email, 
      MIN(se.join_date) AS join_date -- Use the join_date from student_event table
    FROM 
      student s
    JOIN 
      student_event se 
    ON 
      s.student_id = se.student_id
    WHERE 
      se.club_id = $1 
      AND se.action = 'subscribed' -- Only select subscribed members
    GROUP BY 
      s.student_id, s.first_name, s.last_name, s.email; -- Ensure all selected columns are in GROUP BY
  `;

  try {
    const result = await query(queryText, [club_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No subscribed members found for this club' });
    }
    res.json({ members: result.rows });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


// GET /club/events
router.get('/events', club_verifyToken, async (req, res) => {
  const club_id = req.user.club_id;

  const queryText = `
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
        ce.club_id = $1
      GROUP BY 
        ce.event_id;
    `;

  try {
    const result = await query(queryText, [club_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No events found for this club' });
    }
    res.json({ events: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /club/past-events
router.get('/past-events', club_verifyToken, async (req, res) => {
  const club_id = req.user.club_id;

  const queryText = `
      SELECT event_name, event_date 
      FROM club_event 
      WHERE club_id = $1 AND event_date < CURRENT_DATE
      ORDER BY event_date DESC;
    `;

  try {
    const result = await query(queryText, [club_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No past events found for this club' });
    }
    res.json({ past_events: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/eventsByDateTime', club_verifyToken, async (req, res) => {
  const { event_date, time } = req.body;

  if (!event_date || !time) {
    return res.status(400).json({ error: 'Missing event_date or time' });
  }

  const queryText = `
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
        ce.event_date = $1
        AND $2::time BETWEEN ce.event_start_time AND ce.event_end_time
      GROUP BY 
        ce.event_id, cu.name;
    `;

  try {
    const result = await query(queryText, [event_date, time]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No events found for the given date and time' });
    }
    res.json({ events: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/club_member_register', club_verifyToken, async (req, res) => {
  try {
    const { name, role, skills_interest, email, phone_number, password } = req.body;

    // Validate required fields
    if (!name || !role || !email || !phone_number || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if email already exists in the database
    const existingUserQuery = 'SELECT * FROM club_member WHERE email = $1';
    const existingUser = await pool.query(existingUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Use club_id from the verified token
    const club_id = req.user.club_id;
    console.log(club_id);


    // Insert new member into the database with club_id
    const insertQuery = `
      INSERT INTO club_member (name, role, skills_interest, email, phone_number, password, club_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING member_id
    `;
    const result = await pool.query(insertQuery, [name, role, skills_interest, email, phone_number, password, club_id]);

    // Return success response
    res.status(200).json({ message: 'Club Member registered successfully', member_id: result.rows[0].member_id });

  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// const query = (text, params) => pool.query(text, params);
router.post('/club_event_register', club_verifyToken, async (req, res) => {
  try {
    const {
      event_name,
      event_type,
      description,
      event_banner,
      participation_capacity,
      registration_last_date,
      event_date,
      event_start_time,
      event_end_time,
      venue
    } = req.body;

    // Check for missing required fields
    if (!event_name || !event_type || !participation_capacity || !registration_last_date ||
      !event_date || !event_start_time || !event_end_time || !venue) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if an event with the same name already exists
    const existingEvent = await pool.query('SELECT * FROM club_event WHERE event_name = $1', [event_name]);
    if (existingEvent.rows.length > 0) {
      return res.status(409).json({ message: 'Event already registered' });
    }

    // Use club_id from the verified token (attached by middleware)
    const club_id = req.user.club_id;

    // Insert new event into the club_event table
    const result = await pool.query(
      `INSERT INTO club_event (event_name, event_type, description, event_banner, 
       participation_capacity, registration_last_date, event_date, event_start_time, 
       event_end_time, venue, club_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING event_id`,
      [
        event_name, event_type, description, event_banner, participation_capacity,
        registration_last_date, event_date, event_start_time, event_end_time,
        venue, club_id
      ]
    );

    // Return success response with the new event ID
    res.status(200).json({
      message: 'New Club Event registered successfully',
      event_id: result.rows[0].event_id
    });
  } catch (error) {
    console.error('Error while registering event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// router.get('/clubDashboard', club_verifyToken, async (req, res) => {
//     const { club_id } = req.user;

//     try {
//         const query1 = `
//             SELECT 
//                 (SELECT COUNT(*) FROM club_event WHERE club_id = $1) AS total_hosted_events,
//                 (SELECT COUNT(*) FROM club_event WHERE club_id = $1 AND event_date > CURRENT_DATE) AS future_scheduled_events,
//                 (SELECT COUNT(*) FROM student_event WHERE club_id = $1 AND action = 'subscribed') AS total_members,
//                 (SELECT event_start_time FROM club_event WHERE club_id = $1 AND event_date >= CURRENT_DATE ORDER BY event_date ASC LIMIT 1) AS next_event_start_time;
//         `;
//         const result1 = await query(query1, [club_id]);

//         const query2 = `
//             SELECT event_name, event_start_time, event_end_time
//             FROM club_event
//             WHERE club_id = $1 AND event_date >= CURRENT_DATE
//             ORDER BY event_date ASC;
//         `;
//         const upcomingEvents = await query(query2, [club_id]);

//         const query3 = `
//             SELECT EXTRACT(HOUR FROM event_start_time) AS hour, COUNT(*) AS count
//             FROM club_event
//             WHERE club_id = $1
//             GROUP BY EXTRACT(HOUR FROM event_start_time);
//         `;
//         const preferenceTimeChart = await query(query3, [club_id]);

//         const totalEvents = preferenceTimeChart.rows.reduce((acc, val) => acc + parseInt(val.count), 0);
//         const preferenceTimeData = preferenceTimeChart.rows.map(row => ({
//             hour: parseInt(row.hour),
//             percentage: totalEvents > 0 ? ((parseInt(row.count) / totalEvents) * 100).toFixed(2) : 0
//         }));

//         const popularDomains = [
//             { domain: 'AI', percentage: 35 },
//             { domain: 'Web Development', percentage: 30 },
//             { domain: 'Data Science', percentage: 20 },
//             { domain: 'Blockchain', percentage: 15 }
//         ];

//         const query5 = `
//             SELECT 
//                 ce.event_name, 
//                 COUNT(se.student_id) AS actual_participants, 
//                 ce.participation_capacity AS target_participants
//             FROM club_event ce
//             LEFT JOIN student_event se ON ce.event_id = se.event_id
//             WHERE ce.club_id = $1
//             GROUP BY ce.event_id, ce.participation_capacity;
//         `;
//         const participantsChart = await query(query5, [club_id]);

//         const query6 = `
//             SELECT 
//                 SUM(CASE WHEN EXTRACT(MONTH FROM s.created_at) = EXTRACT(MONTH FROM CURRENT_DATE) THEN 1 ELSE 0 END) AS new_users,
//                 SUM(CASE WHEN se.event_id IS NOT NULL THEN 1 ELSE 0 END) AS loyal_users,
//                 COUNT(DISTINCT s.student_id) AS unique_users
//             FROM student s
//             LEFT JOIN student_event se ON s.student_id = se.student_id AND se.club_id = $1
//             WHERE s.student_id IN (
//                 SELECT student_id FROM student_event WHERE club_id = $1
//             );
//         `;
//         const userStats = await query(query6, [club_id]);

//         res.json({
//             dashboard: {
//                 total_hosted_events: result1.rows[0].total_hosted_events,
//                 future_scheduled_events: result1.rows[0].future_scheduled_events,
//                 total_members: result1.rows[0].total_members,
//                 next_event_start_time: result1.rows[0].next_event_start_time,
//                 upcoming_events: upcomingEvents.rows,
//                 preference_time_chart: preferenceTimeData,
//                 popular_domain_percentage: popularDomains,
//                 participants_chart: participantsChart.rows,
//                 user_stats: userStats.rows[0]
//             }
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/dashboard', (req, res) => {
  const clubId = req.query.club_id;

  // Query to get total events
  const totalEventsQuery = `
    SELECT COUNT(*) AS total_events
    FROM club_event
    WHERE club_id = ${clubId};
  `;

  // Query to get total participants
  const totalParticipantsQuery = `
    SELECT COUNT(*) AS total_participants
    FROM student_event
    WHERE club_id = ${clubId};
  `;

  // Query to get upcoming events
  const upcomingEventsQuery = `
    SELECT COUNT(*) AS upcoming_events
    FROM club_event
    WHERE club_id = ${clubId} AND event_date > CURDATE();
  `;

  // Query to get new users (registered within the last 30 days)
  const newUsersQuery = `
    SELECT COUNT(*) AS new_users
    FROM student
    WHERE DATEDIFF(CURDATE(), created_at) <= 30;
  `;

  // Execute all queries asynchronously
  query(totalEventsQuery, (err, totalEventsResult) => {
    if (err) return res.status(500).send(err);

    query(totalParticipantsQuery, (err, totalParticipantsResult) => {
      if (err) return res.status(500).send(err);

      query(upcomingEventsQuery, (err, upcomingEventsResult) => {
        if (err) return res.status(500).send(err);

        query(newUsersQuery, (err, newUsersResult) => {
          if (err) return res.status(500).send(err);

          // Construct the response
          const response = {
            totalEvents: totalEventsResult[0].total_events,
            totalParticipants: totalParticipantsResult[0].total_participants,
            upcomingEvents: upcomingEventsResult[0].upcoming_events,
            newUsers: newUsersResult[0].new_users,
          };

          res.json(response);
        });
      });
    });
  });
});




module.exports = router;