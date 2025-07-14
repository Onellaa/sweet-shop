import db from "../config/db.js";

export const getUserProfile = async (req, res) => {
  const customer_id = req.customer.id;

  try {
    const [rows] = await db.query(
      "SELECT cname, email, phone, address FROM customers WHERE cid = ?",
      [customer_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
