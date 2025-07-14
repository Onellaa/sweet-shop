import jwt from "jsonwebtoken";

const JWT_SECRET = "mysecretkey"; // Same as in controller

export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};




export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Remove "Bearer "

  try {
    // console.log("🔐 Token received in backend:", token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded:", decoded);
    req.customer = { id: decoded.id }; // You can now access req.customer.id
    next(); // ✅ Go to the next route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
