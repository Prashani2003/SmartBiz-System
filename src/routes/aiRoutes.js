const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { question } = req.body;

        res.json({
            answer: `AI says: "${question}" is a great question 😎`
        });

    } catch (err) {
        res.status(500).json({ message: "AI error" });
    }
});

module.exports = router;