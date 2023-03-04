require('dotenv-safe').config();
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'emucoach-world'
});

module.exports = conn;