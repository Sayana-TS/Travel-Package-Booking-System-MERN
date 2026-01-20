import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// @desc    Get logged-in user profile
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;
