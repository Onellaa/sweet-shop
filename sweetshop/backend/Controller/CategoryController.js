import express from "express";
const router = express.Router();
import db from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const [getCategories] = await db.query("Select * from categories");
    res.json(getCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get categories with product counts
export const getCategoriesWithCounts = async (req, res) => {
  try {
    const [categories] = await db.query(`
      SELECT c.*, COUNT(p.pid) as product_count 
      FROM categories c
      LEFT JOIN products p ON c.cid = p.category_id
      GROUP BY c.cid
    `);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req, res) => {
  const { cname, description } = req.body;

  const [rows] = await db.query("SELECT MAX(cid) AS maxId FROM categories");
  const newCid = (rows[0].maxId || 0) + 1; // If null, start at 1
  try {
    const [result] = db.query(
      "insert into categories (cid,cname,description) values(?,?,?)",
      [newCid, cname, description]
    );
    res.status(201).json({ id: newCid, cname, description });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  const { cid } = req.params;

  try {
    const [result] = await db.query("SELECT *FROM categories WHERE  cid=? ", [
      cid,
    ]);
    if (!result.length) {
      return res.status(404).json({ message: "Category not found" });
    }
    const updatedData = {
      cname: req.body.cname || result[0].cname,
      description: req.body.description || result[0].description,
    };
    await db.query(`UPDATE categories SET cname=?, description=? WHERE cid=?`, [
      updatedData.cname,
      updatedData.description,
      cid,
    ]);
    const [updatedCategory] = await db.query(
      "SELECT * FROM categories WHERE cid=?",
      [cid]
    );
    res.json(updatedCategory[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { cid } = req.params;

  try {
    const [result] = await db.query("SELECT * FROM categories WHERE cid=?", [
      cid,
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "Category not found!" });
    }

    await db.query("DELETE FROM categories WHERE cid=?", [cid]);
    res.json({
      sucess: true, // indicates the operation was successful
      message: "Category deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to delete category",
    });
  }
};

export default router;
