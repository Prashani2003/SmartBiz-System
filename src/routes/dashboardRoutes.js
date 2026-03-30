const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, dashboardController.getDashboard);

router.get("/sales", authMiddleware, dashboardController.getSalesData);
router.get("/recent-sales", authMiddleware, dashboardController.getRecentSales);
router.get("/top-products", authMiddleware, dashboardController.getTopProducts);

module.exports = router;