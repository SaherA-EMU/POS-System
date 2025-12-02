const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /employees - Fetch all employees
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT employee_id, name, role FROM employees ORDER BY employee_id'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

module.exports = router;
