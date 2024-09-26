

const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const vToken = require('../middlewares/middleware.js');
require('dotenv').config();
const { verifyToken, checkRole } = vToken;

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


module.exports = router;