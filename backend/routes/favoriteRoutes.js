import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import {
  addToFavorites,
  removeFromFavorites,
  getMyFavorites,
  checkFavoriteStatus
} from "../controllers/favoriteController.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Check if package is in favorites
router.get("/check/:packageId", checkFavoriteStatus);

// Get user's favorites
router.get("/", getMyFavorites);

// Add to favorites
router.post("/:packageId", addToFavorites);

// Remove from favorites
router.delete("/:packageId", removeFromFavorites);

export default router;