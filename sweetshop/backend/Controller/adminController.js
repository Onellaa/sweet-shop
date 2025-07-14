import db from "../config/db.js";

export const getCustomerCount = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM customers");
    res.json({ count: rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getOrderCount =async (req,res) =>{
  try{
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM orders");
    res.json({count: rows[0].count})
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getProductCount = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM products");
    res.json({ count: rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryStats = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.cname AS category, COUNT(p.pid) AS productCount
      FROM categories c
      LEFT JOIN products p ON c.cid = p.category_id
      GROUP BY c.cid
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT cid, cname, email, phone, address FROM customers");
    res.json(rows);                    // 200 OK by default
  } catch (err) {
    console.error("❌ Fetch customers failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};