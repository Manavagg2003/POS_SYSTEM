const express = require("express");
const cors = require("cors");
const db = require("./db");
const ordersRoutes = require("./routes/orders"); // Ensure this path is correct

const app = express();

app.use(cors());
app.use(express.json());

// Mount order routes
console.log(ordersRoutes);
app.use("/orders", ordersRoutes); // Ensure ordersRoutes is a valid router

app.get("/", (req, res) => {
    res.send("POS System API is running!");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});