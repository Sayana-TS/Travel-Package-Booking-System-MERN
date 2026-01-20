import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// @desc    Agent dashboard
// @route   GET /api/agents/dashboard
// @access  Private (Agent only)
router.get(
  "/dashboard",
  protect,
  authorize("agent"),
  (req, res) => {
    res.json({
      message: "Welcome Agent",
      agent: req.user,
    });
  }
);

export default router;
