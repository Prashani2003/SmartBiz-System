const db = require("../db/db");


exports.createOrder = (req, res) => {

  const { customer_name, items } = req.body;
  const business_id = req.user.business_id;

  if (!customer_name || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid data" });
  }

  // calculate total
  let total_price = 0;
  items.forEach(item => {
    total_price += item.price * item.quantity;
  });

  // 1️⃣ insert order
  const orderSql = `
    INSERT INTO orders (business_id, customer_name, total_price)
    VALUES (?, ?, ?)
  `;

  db.query(orderSql, [business_id, customer_name, total_price], (err, result) => {

    if (err) {
      console.error("Order Insert Error:", err);
      return res.status(500).json(err);
    }

    const order_id = result.insertId;

    // 2️⃣ insert order items
    const itemSql = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ?
    `;

    const values = items.map(item => [
      order_id,
      item.product_id,
      item.quantity,
      item.price
    ]);

    db.query(itemSql, [values], (err2) => {

      if (err2) {
        console.error("Order Items Error:", err2);
        return res.status(500).json(err2);
      }

      res.json({ message: "Order created successfully" });

    });

  });

};



// GET ALL ORDERS
exports.getOrders = (req, res) => {

  const business_id = req.user.id;

  const sql = "SELECT * FROM orders WHERE business_id=?";

  db.query(sql, [business_id], (err, result) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);

  });

};



// GET SINGLE ORDER + ITEMS
exports.getOrderDetails = (req, res) => {

  const { id } = req.params;

  const orderSql = "SELECT * FROM orders WHERE id=?";

  db.query(orderSql, [id], (err, orderResult) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const itemSql =
      "SELECT * FROM order_items WHERE order_id=?";

    db.query(itemSql, [id], (err, itemResult) => {

      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        order: orderResult[0],
        items: itemResult
      });

    });

  });

};