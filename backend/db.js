const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  host:     process.env.PGHOST,
  port:     process.env.PGPORT,
  database: process.env.PGNAME,
  user:     process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

module.exports = pool;