import express from "express";
import {
  getCustomerCount,
  getOrderCount,
  getProductCount,
  getCategoryStats,
  getAllCustomers
} from "../Controller/adminController.js";
import db from "../config/db.js";
const router = express.Router();

router.get("/count/customers", getCustomerCount);
router.get("/count/orders", getOrderCount);
router.get("/count/products", getProductCount);
router.get("/stats/categories", getCategoryStats);
// GET all customers
router.get("/customers", getAllCustomers);  

export default router;
