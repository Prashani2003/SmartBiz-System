const express = require("express");

const router = express.Router();

const businessController = require("../controllers/businessController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, businessController.createBusiness);

module.exports = router;