const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM orders", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const { dish_name, quantity } = req.body;

    db.query("SELECT price, stock FROM inventory WHERE name = ?", [dish_name], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Dish not found" });

        const { price, stock } = result[0];
        if (stock < quantity) return res.status(400).json({ message: "Not enough stock available" });

        const total_price = price * quantity;

        db.query("INSERT INTO orders (dish_name, quantity, total_price) VALUES (?, ?, ?)", 
            [dish_name, quantity, total_price], (err, result) => {
            if (err) return res.status(500).json(err);

            db.query("UPDATE inventory SET stock = stock - ? WHERE name = ?", 
                [quantity, dish_name], (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Order placed", orderId: result.insertId });
            });
        });
    });
});

module.exports = router;
