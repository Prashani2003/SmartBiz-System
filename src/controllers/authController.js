const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ======================
// REGISTER USER
// ======================
exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User registered successfully"
      });

    });

  } catch (error) {
    res.status(500).json(error);
  }

};



// ======================
// LOGIN USER
// ======================
exports.login = (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  });

};