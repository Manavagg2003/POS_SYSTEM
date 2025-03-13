const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    db.query("DELETE FROM orders", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Checkout successful. All orders cleared." });
    });
});

module.exports = router;
