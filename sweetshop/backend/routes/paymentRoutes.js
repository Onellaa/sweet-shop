import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkout } from "../Controller/paymentController.js";

const router = Router();

router.post("/checkout", verifyToken, checkout); // ✅ protected

export default router;
