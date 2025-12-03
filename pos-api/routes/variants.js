const express = require('express');
const router = express.Router();
const pool = require ('../db');

console.log("DB = ", process.env.DB_CONNECTION_STRING);

// GET all variants with optional filters (for ItemLookUp)
// GET /variants
// Returns list of all variants with product names
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                pv.variant_id,
                p.name,
                pv.size,
                pv.color,
                pv.price,
                pv.quantity
            FROM product_variant pv
            JOIN products p ON pv.product_id = p.product_id
            ORDER BY p.name, pv.size, pv.color`
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching all variants:', err.message, err.code);
        res.status(500).json({error: err.message });
    }
});

// GET variants by product_id
// GET /variants/:product_id
// Returns list of variants for a specific product
router.get('/:product_id', async (req, res) => {
    const {product_id} = req.params;
    try {
        const result = await pool.query(
            `SELECT variant_id, product_id, size, color, price, quantity FROM product_variant WHERE product_id = $1`,
            [product_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching variants:', err.message, err.code);
        res.status(500).json({error: err.message });
    }
});

// POST new variant (for AddItem)
// POST /variants
// Expects JSON { name: string, size: string, color: string, price: number, quantity: number }
router.post('/', async (req, res) => {
    const { name, size, color, price, quantity } = req.body;

    // Validate required fields
    if (!name || !size || !color || price === undefined || quantity === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate numeric fields
    if (isNaN(price) || isNaN(quantity)) {
        return res.status(400).json({ error: 'Price and quantity must be numbers' });
    }

    try {
        // First, find the product_id based on the name
        let productResult = await pool.query(
            'SELECT product_id FROM products WHERE name = $1',
            [name]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({ error: `Product "${name}" not found. Please ensure the product exists in the database.` });
        }

        const product_id = productResult.rows[0].product_id;

        // Check if this exact variant already exists
        const existingVariant = await pool.query(
            'SELECT variant_id, quantity FROM product_variant WHERE product_id = $1 AND size = $2 AND color = $3',
            [product_id, size, color]
        );

        if (existingVariant.rows.length > 0) {
            // Variant exists, update the quantity
            const newQuantity = parseInt(existingVariant.rows[0].quantity) + parseInt(quantity);
            await pool.query(
                'UPDATE product_variant SET quantity = $1, price = $2 WHERE variant_id = $3',
                [newQuantity, price, existingVariant.rows[0].variant_id]
            );
            return res.status(200).json({
                message: 'Variant quantity updated successfully',
                variant_id: existingVariant.rows[0].variant_id,
                product_id,
                new_quantity: newQuantity
            });
        } else {
            // Insert new variant
            const result = await pool.query(
                'INSERT INTO product_variant (product_id, size, color, price, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING variant_id',
                [product_id, size, color, price, quantity]
            );

            res.status(201).json({
                message: 'Variant created successfully',
                variant_id: result.rows[0].variant_id,
                product_id
            });
        }
    } catch (err) {
        console.error('Error creating variant:', err);
        res.status(500).json({ error: 'Failed to create variant', details: err.message });
    }
});

// DELETE variant (for reporting lost items)
// DELETE /variants/:variant_id
// Expects URL param variant_id
router.delete('/:variant_id', async (req, res) => {
    const { variant_id } = req.params;

    // Validate variant_id
    if (!variant_id || isNaN(variant_id)) {
        return res.status(400).json({ error: 'Valid variant_id is required' });
    }

    try {
        // Delete the variant from the database
        const result = await pool.query(
            'DELETE FROM product_variant WHERE variant_id = $1 RETURNING variant_id',
            [variant_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Variant not found' });
        }

        res.status(200).json({
            message: 'Variant deleted successfully',
            variant_id: result.rows[0].variant_id
        });
    } catch (err) {
        console.error('Error deleting variant:', err);
        res.status(500).json({ error: 'Failed to delete variant', details: err.message });
    }
});

module.exports = router;