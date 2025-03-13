const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM inventory", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const { name, price, stock } = req.body;
    db.query("INSERT INTO inventory (name, price, stock) VALUES (?, ?, ?)", 
        [name, price, stock], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item added", itemId: result.insertId });
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    db.query("UPDATE inventory SET name = ?, price = ?, stock = ? WHERE id = ?", 
        [name, price, stock, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item updated" });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM inventory WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item deleted" });
    });
});

module.exports = router;
