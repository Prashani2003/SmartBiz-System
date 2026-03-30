const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./src/db/db");

const authRoutes = require("./src/routes/authRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");
const businessRoutes = require("./src/routes/businessRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const customerRoutes = require("./src/routes/customer");
const expenseRoutes = require("./src/routes/expenseRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes); 
app.use("/api/ai", aiRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/expenses", expenseRoutes);

// test route
app.get("/", (req, res) => {
  res.send("SmartBiz Backend Running");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});