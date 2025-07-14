import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = "mysecretkey";

export const customerSignup = async (req, res) => {
  try {
    const { cname, email, password, phone, address } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!cname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    console.log("🛬 Signup request received:", req.body);

    const [result] = await db.query(
      `INSERT INTO customers (cname, email, password, phone, address) VALUES (?, ?, ?, ?, ?)`,
      [cname, email, hashedPassword, phone, address]
    );
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    console.error("❌ Error during signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [results] = await db.query(
      `SELECT * FROM customers WHERE email = ?`,
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const customer = results[0];
    const isMatch = bcrypt.compareSync(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: customer.cid, email: customer.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      customer: {
        id: customer.cid,
        name: customer.cname,
        email: customer.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminLogin = async (req, res) => {
  console.log("🛠️ Admin login attempt received:", req.body);
  const { email, password } = req.body;

  // 🔐 Hardcoded admin credentials
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "onella";

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { role: "admin", email }, // You can add any payload you want
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Admin login successful",
    token,
    admin: {
      email,
      role: "admin",
    },
  });
};
