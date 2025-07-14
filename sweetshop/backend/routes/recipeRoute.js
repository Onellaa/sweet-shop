import express from "express";
import { generateRecipe } from "../Controller/recipeController.js";
const router = express.Router();

router.post("/recipe", generateRecipe);

export default router;
