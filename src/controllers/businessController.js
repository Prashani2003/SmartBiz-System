const db = require("../db/db");

exports.createBusiness = (req, res) => {

  const { name, address, phone } = req.body;

  const userId = req.user.id;

  const sql = "INSERT INTO businesses (user_id,name,address,phone) VALUES (?,?,?,?)";

  db.query(sql, [userId, name, address, phone], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Business created successfully"
    });

  });

};