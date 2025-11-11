const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const {name, category_id} = req.body;

  // Validate required fields
  if (!name || !category_id) {
    return res.status(400).json({ error: 'Name and Category_id are required' });
  }
  try {

    // Insert into products table
    const result = await pool.query(
      'INSERT INTO products (name, category_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING product_id',
      [name, category_id]
    );

    res.status(201).json({ message: 'Product created', product_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product'});
  }
});

// This will be for getting products
router.get('/', async (req, res) => {
  const {id} = req.params;

  try{
    const result = await pool.query('SELECT product_id, name FROM products');
    res.json(result.rows);
  } catch (err){
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message});
  }
});

module.exports = router;