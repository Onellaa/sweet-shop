import express from "express";
const router = express.Router();
import db from "../config/db.js";

export const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const customer_id = req.customer.id; // Assuming customer_id is set in auth middleware

  try {
    // Check if the product already exists in the cart
    const [existingCartItem] = await db.query(
      "SELECT * FROM cart WHERE customer_id = ? AND product_id = ?",
      [customer_id, product_id]
    );

    if (existingCartItem.length > 0) {
      // Update quantity if item already exists
      await db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE customer_id = ? AND product_id = ?",
        [quantity, customer_id, product_id]
      );
      return res.status(200).json({ message: "Already in cart, quantity increased" });
    } else {
      // Insert new item into the cart
      await db.query(
        "INSERT INTO cart (customer_id, product_id, quantity) VALUES (?, ?, ?)",
        [customer_id, product_id, quantity]
      );
      return res.status(201).json({ message: "Item added to cart" });
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).json({ error: "Internal server error" });
  }

  console.log("🛒 Adding to cart", {
    customer_id,
    product_id,
    quantity,

  });
};

//get cart items
export const getCartItems = async (req, res) => {
  const customer_id = req.customer.id;
  try {
    const [items] = await db.query(
      `SELECT c.cart_id, c.product_id, c.quantity, p.pname, p.price, p.image_url
      FROM cart c
      JOIN products p ON c.product_id = p.pid
      WHERE c.customer_id = ?
    `,
      [customer_id]
    );
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const customer_id = req.customer.id;
  const { product_id } = req.params;
  try {
    await db.query(
      "DELETE FROM cart WHERE customer_id = ? AND product_id = ?",
      [customer_id, product_id]
    );

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const customer_id = req.customer.id;
  try {
    await db.query("DELETE FROM cart WHERE customer_id = ?", [customer_id]);
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const incrementQty = async (req, res) => {
const cid = req.customer.id;
const { product_id } = req.params;

    await db.query(
      "UPDATE cart SET quantity = quantity + 1 WHERE customer_id = ? AND product_id = ?",
      [cid, product_id]
    );
    res.json({ message: "Quantity incremented successfully" });

  }
export const decrementQty = async (req, res) => {
const cid = req.customer.id;
const { product_id } = req.params;

    await db.query(
      "UPDATE cart SET quantity = quantity - 1 WHERE customer_id = ? AND product_id = ? AND quantity > 1",
      [cid, product_id]
    );

      await db.query(
    "DELETE FROM cart WHERE customer_id = ? AND product_id = ? AND quantity <= 0",
    [cid, product_id]
  );
    res.json({ message: "Quantity incremented successfully" });

  }
