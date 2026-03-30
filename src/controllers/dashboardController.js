const db = require("../db/db");

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.getDashboard = async (req, res) => {
  try {
    const business_id = req.user.business_id;

    const sql1 = "SELECT COUNT(*) AS total_products FROM products WHERE business_id=?";
    const sql2 = "SELECT COUNT(*) AS total_orders, SUM(total_price) AS total_revenue FROM orders WHERE business_id=?";
    const sql3 = "SELECT COUNT(*) AS low_stock FROM products WHERE business_id=? AND stock < 5";

    const [products, orders, lowstock] = await Promise.all([
      query(sql1, [business_id]),
      query(sql2, [business_id]),
      query(sql3, [business_id])
    ]);

    res.json({
      total_products: products[0].total_products,
      total_orders: orders[0].total_orders,
      total_revenue: orders[0].total_revenue || 0,
      low_stock: lowstock[0].low_stock
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getRecentSales = async (req, res) => {
  try {
    const business_id = req.user.business_id;

    const sql = `
      SELECT id, customer_name, total_price, created_at
      FROM orders
      WHERE business_id = ?
      ORDER BY created_at DESC
      LIMIT 5
    `;

    db.query(sql, [business_id], (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



exports.getSalesData = (req, res) => {
  const business_id = req.user.business_id;

  const sql = `
    SELECT DATE(created_at) AS date, SUM(total_price) AS total
    FROM orders
    WHERE business_id = ?
    AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  db.query(sql, [business_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(results);
  });
};


exports.getTopProducts = async (req, res) => {
  try {
    const business_id = req.user.business_id;

    const sql = `
      SELECT 
        p.name,
        SUM(oi.quantity) AS total_sold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.business_id = ?
      GROUP BY oi.product_id
      ORDER BY total_sold DESC
      LIMIT 5
    `;

    const result = await query(sql, [business_id]);

    res.json(result);

  } catch (error) {
    console.error("Top Products Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};