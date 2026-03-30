const db = require("../db/db");

// ➕ ADD expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const business_id = req.user.business_id;

    const [result] = await db.query(
      "INSERT INTO expenses (business_id, title, amount, category) VALUES (?, ?, ?, ?)",
      [business_id, title, amount, category]
    );

    res.json({ message: "Expense added", id: result.insertId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding expense" });
  }
};

// 📄 GET all expenses
exports.getExpenses = async (req, res) => {
  try {
    const business_id = req.user.business_id;

    const [rows] = await db.query(
      "SELECT * FROM expenses WHERE business_id = ? ORDER BY created_at DESC",
      [business_id]
    );

    res.json(rows);

  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};