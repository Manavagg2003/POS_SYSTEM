const express = require("express");
const cors = require("cors");
const db = require("./db");
const inventoryRoutes = require("./routes/inventory");
const ordersRoutes = require("./routes/orders");
const checkoutRoutes = require("./routes/checkout");
const printBillRoutes = require("./routes/printBill");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/inventory", inventoryRoutes);
app.use("/orders", ordersRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/print-bill", printBillRoutes);

app.get("/", (req, res) => {
    res.send("POS System API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
