const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, usersController.getUsers);
router.delete("/:id", authMiddleware, usersController.deleteUser);

module.exports = router;