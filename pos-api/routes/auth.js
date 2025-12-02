const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /auth/login
// Expects JSON { employeeId: number }
router.post('/login', async (req, res) => {
  const { employeeId } = req.body;
  if (employeeId === undefined || employeeId === null) {
    return res.status(400).json({ error: 'employeeId is required' });
  }

  try {
    const result = await pool.query(
      'SELECT employee_id, name, role FROM employees WHERE employee_id = $1',
      [employeeId]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid employee ID' });
    }

    const row = result.rows[0];
    const user = {
      id: row.employee_id,
      name: row.name,
      role: row.role,
    };

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Auth login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /auth/verify-manager
// Expects JSON { managerId: number }
router.post('/verify-manager', async (req, res) => {
  const { managerId } = req.body;
  if (managerId === undefined || managerId === null) {
    return res.status(400).json({ error: 'managerId is required' });
  }

  try {
    const result = await pool.query(
      `SELECT employee_id, name, role FROM employees WHERE employee_id = $1 AND LOWER(role) = 'manager'`,
      [managerId]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid manager credentials' });
    }

    const row = result.rows[0];
    const manager = { id: row.employee_id, name: row.name, role: row.role };
    return res.json({ success: true, manager });
  } catch (err) {
    console.error('Verify manager error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
