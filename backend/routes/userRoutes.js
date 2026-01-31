import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import { updateUserProfile } from "../controllers/authController.js"; // Import from auth

const router = express.Router();

router.get("/profile", protect, (req, res) => res.json(req.user));
router.put("/profile", protect, updateUserProfile); // Added for Profile Management

export default router;