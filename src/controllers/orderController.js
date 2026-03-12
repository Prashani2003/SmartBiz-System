const db = require("../db/db");


// CREATE ORDER
exports.createOrder = (req, res) => {

  const { business_id, customer_name, items } = req.body;

  // calculate total price
  let total_price = 0;

  items.forEach(item => {
    total_price += item.unit_price * item.qty;
  });


  // insert order
  const orderSql =
    "INSERT INTO orders (business_id, customer_name, total_price) VALUES (?,?,?)";

  db.query(orderSql, [business_id, customer_name, total_price], (err, result) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const orderId = result.insertId;


    // prepare order items
    const itemSql =
      "INSERT INTO order_items (order_id, product_id, unit_price, qty) VALUES ?";

    const values = items.map(item => [
      orderId,
      item.product_id,
      item.unit_price,
      item.qty
    ]);


    // insert order items
    db.query(itemSql, [values], (err) => {

      if (err) {
        return res.status(500).json({ error: err.message });
      }


      // 🔥 reduce product stock
      items.forEach(item => {

        const updateStock =
          "UPDATE products SET stock = stock - ? WHERE id=?";

        db.query(updateStock, [item.qty, item.product_id]);

      });


      res.json({
        message: "Order created successfully",
        order_id: orderId,
        total_price: total_price
      });

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