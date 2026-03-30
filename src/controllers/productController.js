const db = require("../db/db");

exports.createProduct = (req, res) => {
    const { name, price, stock } = req.body;
    const business_id = req.user.business_id;

    if (!name || !price || !stock) {
        return res.status(400).json({ message: "All fields required" });
    }

    const sql = "INSERT INTO products (business_id, name, price, stock) VALUES (?, ?, ?, ?)";

    db.query(sql, [business_id, name, price, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            message: "Product created successfully",
            productId: result.insertId
        });
    });
};


exports.getProducts = (req, res) => {
    const business_id = req.user.business_id;

    const sql = "SELECT * FROM products WHERE business_id=?";

    db.query(sql, [business_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(result);
    });
};


exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ message: "All fields required" });
    }

    const sql = "UPDATE products SET name=?, price=?, stock=? WHERE id=? AND business_id=?";

    db.query(sql, [name, price, stock, id, req.user.business_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Product updated" });
    });
};


exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id=? AND business_id=?";

    db.query(sql, [id, req.user.business_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Product deleted" });
    });
};