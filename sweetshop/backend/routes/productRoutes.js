import express from "express";
const router = express.Router();

import {
  createProducts,
  getProducts,
  upload,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
} from "../Controller/ProductController.js";
import multer from "multer";

// Get all categories
router.get("/", getProducts);
router.get("/by-category/:cid", getProductsByCategoryId); // New route
// Create product with error handling
router.post(
  "/",
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Everything is ok, proceed with your logic
      next();
    });
  },
  createProducts
);

// Update product with error handling
router.put(
  "/:pid",
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Everything is ok, proceed with your logic
      next();
    });
  },
  updateProduct
);

// Delete product
router.delete("/:pid", deleteProduct);

export default router;
