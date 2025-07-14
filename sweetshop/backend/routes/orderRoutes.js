import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getCustomerOrders, getOrderItems } from "../Controller/orderController.js";

const router = Router();

router.get("/orders", verifyToken, getCustomerOrders);
router.get("/orders/:id/items", verifyToken, getOrderItems);

export default router;
