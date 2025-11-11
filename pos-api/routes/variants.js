const express = require('express');
const router = express.Router();
const pool = require ('../db');

console.log("DB = ", process.env.DB_CONNECTION_STRING);

router.get('/:product_id', async (req, res) => {
    const {product_id} = req.params;
    try {
        const result = await pool.query(
            `SELECT variant_id, product_id, size, color, price, stock_quantity FROM product_variant WHERE product_id = $1`,
            [product_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching variants:', err.message, err.code);
        res.status(500).json({error: err.message });
    }
});

module.exports = router;