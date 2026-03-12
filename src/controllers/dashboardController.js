const db = require("../db/db");

exports.getDashboard = (req, res) => {

 const business_id = req.user.id;

 const sql1 = "SELECT COUNT(*) AS total_products FROM products WHERE business_id=?";
 const sql2 = "SELECT COUNT(*) AS total_orders, SUM(total_price) AS total_revenue FROM orders WHERE business_id=?";
 const sql3 = "SELECT COUNT(*) AS low_stock FROM products WHERE business_id=? AND stock < 5";

 db.query(sql1,[business_id],(err,products)=>{
   if(err) return res.status(500).json(err);

   db.query(sql2,[business_id],(err,orders)=>{
     if(err) return res.status(500).json(err);

     db.query(sql3,[business_id],(err,lowstock)=>{
       if(err) return res.status(500).json(err);

       res.json({
        total_products: products[0].total_products,
        total_orders: orders[0].total_orders,
        total_revenue: orders[0].total_revenue || 0,
        low_stock: lowstock[0].low_stock
       });

     });
   });
 });

};