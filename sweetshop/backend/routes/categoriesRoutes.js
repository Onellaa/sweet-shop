import express from "express";
const router = express.Router();

import {
  getCategories,
  createCategory,
  getCategoriesWithCounts,
  updateCategory,
  deleteCategory,
} from "../Controller/CategoryController.js";

// Get all categories
router.get("/", getCategories);
router.get("/with-counts", getCategoriesWithCounts); // New route
// Create a new category
router.post("/", createCategory);
router.put("/:cid", updateCategory);
router.delete("/:cid", deleteCategory);
export default router;
