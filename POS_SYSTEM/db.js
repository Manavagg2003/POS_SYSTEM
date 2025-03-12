const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hello@2025",   // Your MySQL password
    database: "pos_system"
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to the database.");
});

module.exports = db;
