const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM orders", (err, orders) => {
        if (err) return res.status(500).json(err);

        let totalAmount = orders.reduce((sum, order) => sum + order.total_price, 0);

        res.json({
            message: "Bill generated successfully",
            orders,
            totalAmount
        });
    });
});

module.exports = router;
