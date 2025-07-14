import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes   from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/customers", customerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/payment", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api", recipeRoutes);
app.use("/api/admin", adminRoutes);
//start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
