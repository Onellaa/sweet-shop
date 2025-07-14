import express from "express";
const router = express.Router();
import db from "../config/db.js"; // now correctly exports promise-based pool
import multer from "multer";
import path from "path";

// 🖼️ File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

// 📥 Get all products
export const getProducts = async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, c.cname AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.cid
    `);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get by category
export const getProductsByCategoryId = async (req, res) => {
  const { cid } = req.params;
  try {
    const [products] = await db.query(
      `
      SELECT p.*, c.cname as category_name 
      FROM products p
      JOIN categories c ON p.category_id = c.cid
      WHERE p.category_id = ?
    `,
      [cid]
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Add new product
export const createProducts = async (req, res) => {
  const { pname, category_id, price, description } = req.body;
  const image_url = req.file?.filename;

  try {
    const [rows] = await db.query("SELECT MAX(pid) AS maxId FROM products");
    const newPid = (rows[0].maxId || 0) + 1;

    await db.query(
      "INSERT INTO products (pid, pname, category_id, price, image_url, description) VALUES (?, ?, ?, ?, ?, ?)",
      [newPid, pname, category_id, price, image_url, description]
    );

    res.status(201).json({
      pid: newPid,
      pname,
      category_id,
      price,
      image_url,
      description,
      message: "Product added successfully!",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✏️ Update product
export const updateProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    const [product] = await db.query("SELECT * FROM products WHERE pid = ?", [
      pid,
    ]);
    if (!product.length) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const updateData = {
      pname: req.body.pname || product[0].pname,
      category_id: req.body.category_id || product[0].category_id,
      price: req.body.price || product[0].price,
      description: req.body.description || product[0].description,
      image_url: req.file ? req.file.filename : product[0].image_url,
    };

    await db.query(
      `UPDATE products SET 
        pname = ?, category_id = ?, price = ?, image_url = ?, description = ?
        WHERE pid = ?`,
      [
        updateData.pname,
        updateData.category_id,
        updateData.price,
        updateData.image_url,
        updateData.description,
        pid,
      ]
    );

    const [updated] = await db.query("SELECT * FROM products WHERE pid = ?", [
      pid,
    ]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete product
export const deleteProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    const [product] = await db.query("SELECT * FROM products WHERE pid = ?", [
      pid,
    ]);
    if (!product.length) {
      return res.status(404).json({ message: "Product not found!" });
    }

    await db.query("DELETE FROM products WHERE pid = ?", [pid]);
    res.json({ success: true, message: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default router;
