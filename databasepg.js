const Pool = require('pg').Pool;
const dotenv = require('dotenv').config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

module.exports = pool;
