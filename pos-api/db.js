/*
* This centralizes the database connectivity.
*/
require('dotenv').config({ path: './info.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { 
	rejectUnauthorized: false,
	require: true,	// Force SSL
  } // Neon requires SSL
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connection established');
    release();
  }
});

module.exports = pool;