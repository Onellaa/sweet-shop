import db from "../config/db.js";

export const checkout = async (req, res) => {
  const customer_id = req.customer.id;
  const { paymentMethod } = req.body;
  try {
    const [cartItems] = await db.query(
      `SELECT c.product_id, c.quantity, p.price
       FROM cart c
       JOIN products p ON c.product_id = p.pid
       WHERE c.customer_id = ?`,
      [customer_id]
    );
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    // 2. Calculate Total
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    // 3. Set status based on payment method
   const status = "Pending";

    // 4. Insert Order table
    const [orderRes] = await db.query(
      "INSERT INTO orders (customer_id, total, status) VALUES (?, ?, ?)",
      [customer_id, total, status]
    );
    const orderId = orderRes.insertId;
    // 5. Insert each product to order_items
    for (const item of cartItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, qty, price)   VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price]
      );
    }
    // 6. Clear cart
    await db.query("DELETE FROM cart WHERE customer_id = ?", [customer_id]);
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
