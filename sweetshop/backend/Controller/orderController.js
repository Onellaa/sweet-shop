import db from "../config/db.js";

export const getCustomerOrders = async (req, res) => {
  const customer_id = req.customer.id; // ✅ from the token
console.log("🔥 Fetch orders for customer", customer_id);

  try {
    const [orders] = await db.query(
      "SELECT oid, order_date, status, total FROM orders WHERE customer_id = ? ORDER BY order_date DESC",
      [customer_id]
    );
// console.log("🔥 Fetch orders for customer", customer_id);

    res.status(200).json(orders);
  } catch (err) {
    console.error("Get Orders Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getOrderItems = async (req, res) => {
  const { id } = req.params;
  const customerId = req.customer.id;

  try {
    // Ensure the order belongs to the customer
    const [order] = await db.query("SELECT * FROM orders WHERE oid = ? AND customer_id = ?", [id, customerId]);
    if (order.length === 0) return res.status(403).json({ message: "Unauthorized" });

    // Fetch items for the order
    const [items] = await db.query(
      `SELECT p.pname, p.image_url, oi.qty, oi.price 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.pid 
       WHERE oi.order_id = ?`,
      [id]
    );

    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching order items:", err);
    res.status(500).json({ error: "Server error" });
  }
};
