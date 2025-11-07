const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { name, category_id, size, color, price, sku, description, initial_quantity } = req.body;
  try {
    console.log('Request body:', req.body); // Log input data for debugging

    // Validate required fields
    if (!name || !category_id || !price || !sku) {
      return res.status(400).json({ error: 'Missing required fields: name, category_id, price, or sku' });
    }

    // Insert into products table
    const productResult = await pool.query(
      'INSERT INTO products (category_id, name, size, color, price, sku, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING product_id',
      [category_id, name, size, color, price, sku, description || null] // description is optional
    );
    const product_id = productResult.rows[0].product_id;

    // Insert into inventory table
    await pool.query(
      'INSERT INTO inventory (product_id, quantity, last_updated) VALUES ($1, $2, CURRENT_TIMESTAMP)',
      [product_id, initial_quantity]
    );

    res.status(201).json({ message: 'Product created', product_id });
  } catch (err) {
    console.error('Error in POST /products:', err.stack, err.message, err.code);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

// This will be for getting products
router.get('/:id', async (req, res) => {
  const {id} = req.params;

  try{
    const result = await pool.query('SELECT * from products where product_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err){
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product', details: err.message});
  }
});

module.exports = router;