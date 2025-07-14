// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import db from "../config/db.js";

// const JWT_SECRET = "mysecretkey";

// // ✅ SIGNUP FUNCTION
// export const signup = async (req, res) => {
//   const { cname, email, password, phone, address } = req.body;
//   console.log("🛬 Signup request received:", req.body);

//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const sql = `INSERT INTO customers (cname, email, password, phone, address) VALUES (?, ?, ?, ?, ?)`;

//   db.query(
//     sql,
//     [cname, email, hashedPassword, phone, address],
//     (err, result) => {
//       if (err) {
//         console.error("❌ DB Error:", err);
//         return res.status(500).json({ message: "Signup failed", error: err });
//       }

//       console.log("✅ Signup successful. Inserting user done.");
//       res.status(201).json({ message: "User registered successfully" });
//     }
//   );
// };
// // ✅ LOGIN FUNCTION
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   const sql = `SELECT * FROM customers WHERE email = ?`;

//   db.query(sql, [email], (err, result) => {
//     if (err || result.length === 0) {
//       console.error("DB error:", err);
//       return res.status(401).json({ message: "Invalid email" });
//     }

//     const user = result[0];
//     console.log("🧂 user.password from DB:", user.password);
//     const isMatch = bcrypt.compareSync(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign({ id: user.cid, email: user.email }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.cid,
//         name: user.cname,
//         email: user.email,
//       },
//     });
//   });
// };
