const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./src/db/db");

const authRoutes = require("./src/routes/authRoutes");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("SmartBiz Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});