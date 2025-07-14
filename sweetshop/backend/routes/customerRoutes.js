import express from "express";
import {
  customerSignup,
  customerLogin,
  adminLogin,
} from "../Controller/customerController.js";

const router = express.Router();

router.post("/signup", customerSignup);
router.post("/login", customerLogin);
router.post("/admin/login", adminLogin);
export default router;
