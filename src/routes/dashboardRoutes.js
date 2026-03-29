const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const { getDashboard } = require("../controllers/dashboardController");

router.get("/", authMiddleware, dashboardController.getDashboard);
router.get("/recent-sales", authMiddleware, dashboardController.getRecentSales);
router.get("/", getDashboard);

module.exports = router;