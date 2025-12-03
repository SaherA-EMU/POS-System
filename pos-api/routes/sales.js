const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /sales/complete
// Expects JSON { employee_id: number, payment_type: string, total: number, sale_items: [{ product_id: number, price: number }] }
router.post("/complete", async (req, res) => {
    console.log("/sales/complete HIT");
    console.log("REQ BODY:", JSON.stringify(req.body, null, 2));

    const{employee_id, payment_type, total, sale_items} = req.body;

    try {
        await pool.query("BEGIN");

        const saleResult = await pool.query(
            `INSERT INTO sales (employee_id, total_amount, payment_mmethod)
            VALUES ($1, $2, $3)
            RETURNING sale_id`,
            [employee_id, total, payment_type]
        );

        const sale_id = saleResult.rows[0].sale_id;

        for(const item of sale_items){
            const quantity = 1;
            const unitPrice = Number(item.price);
            const subtotal = quantity * unitPrice;

            await pool.query(
                `INSERT INTO sale_item (sale_id, product_id, quantity, unit_price, subtotal)
                VALUES ($1, $2, $3, $4, $5)`,
                [sale_id, item.product_id, quantity, unitPrice, subtotal]
            );
        }

        await pool.query("COMMIT");
        res.json({success: true, sale_id});
    } catch (err){
        await pool.query("ROLLBACK");
        console.error("SALE ERROR:", err.message);
        res.status(500).json({
            error: "Failed to complete sale",
            details: err.message
        });
    }
});

// GET /sales/history
// Returns list of all sales with details
router.get("/history", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM sales ORDER BY sale_date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sales history" });
  }
});

module.exports = router;