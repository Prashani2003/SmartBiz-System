const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE PRODUCT
router.post("/", authMiddleware, productController.createProduct);

// GET PRODUCTS
router.get("/", authMiddleware, productController.getProducts);

// UPDATE PRODUCT
router.put("/:id", authMiddleware, productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;