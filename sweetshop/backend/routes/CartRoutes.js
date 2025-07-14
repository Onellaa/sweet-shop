import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
  incrementQty,
  decrementQty,
} from "../controller/cartController.js";

const router = express.Router();
// 🛒 Add item to cart
router.post("/add", verifyToken, addToCart);
// 📦 Get cart items
router.get("/", verifyToken, getCartItems);
// ❌ Remove item from cart
router.delete("/:product_id", verifyToken, removeFromCart);
// routes/cartRoutes.js
router.put("/inc/:product_id", verifyToken, incrementQty);
router.put("/dec/:product_id", verifyToken, decrementQty);

// 🧹 Clear cart
router.delete("/", verifyToken, clearCart);

export default router;
