import { Router } from "express";
import { getUserProfile } from "../Controller/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", verifyToken, getUserProfile);

export default router;
