const db = require("../db/db");

exports.getUsers = (req, res) => {

    const sql = "SELECT id, name, email, role FROM users";

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


exports.deleteUser = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM users WHERE id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        res.json({ message: "User deleted successfully" });
    });
};