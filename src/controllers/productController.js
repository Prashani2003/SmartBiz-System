const db = require("../db/db");


// CREATE PRODUCT
exports.createProduct = (req, res) => {

 const { business_id, name, price, stock } = req.body;

 const sql = "INSERT INTO products (business_id,name,price,stock) VALUES (?,?,?,?)";

 db.query(sql,[business_id,name,price,stock],(err,result)=>{

  if(err){
   return res.status(500).json({error:err.message});
  }

  res.json({
   message:"Product created successfully"
  });

 });

};



// GET PRODUCTS
exports.getProducts = (req,res)=>{

 const business_id = req.user.id;

 const sql = "SELECT * FROM products WHERE business_id=?";

 db.query(sql,[business_id],(err,result)=>{

  if(err){
   return res.status(500).json({error:err.message});
  }

  res.json(result);

 });

};

// UPDATE PRODUCT
exports.updateProduct = (req,res)=>{

 const {id} = req.params;
 const {name,price,stock} = req.body;

 const sql = "UPDATE products SET name=?,price=?,stock=? WHERE id=?";

 db.query(sql,[name,price,stock,id],(err,result)=>{

  if(err){
   return res.status(500).json({error:err.message});
  }

  res.json({
   message:"Product updated"
  });

 });

};



// DELETE PRODUCT
exports.deleteProduct = (req,res)=>{

 const {id} = req.params;

 const sql = "DELETE FROM products WHERE id=?";

 db.query(sql,[id],(err,result)=>{

  if(err){
   return res.status(500).json({error:err.message});
  }

  res.json({
   message:"Product deleted"
  });

 });

};