// connect to db
const Pool = require("pg").Pool;
// importing the Pool class from pg module
// a pool is a connection pool, it manages multiple db connections
require("dotenv").config();

// creating a new connection pool with these settings
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

// how you export code from one file so that it can be imported and used
// in another file.
module.exports = pool;
