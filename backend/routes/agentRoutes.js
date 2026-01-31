import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import { createAgentProfile, getAgentPublicProfile, getMyAgentProfile, verifyAgent } from "../controllers/agentController.js"
import { getAgentDashboardStats, getDashboardOverview, getRevenueAnalytics} from "../controllers/agentDashboardController.js"

const router = express.Router();

// @desc    Agent dashboard
// @route   GET /api/agents/dashboard
// @access  Private (Agent only)
router.get(
  "/dashboard",
  protect,
  authorize("agent"),
  (req, res) => {
    res.redirect("/api/agents/dashboard/stats");
  }
);

// Agent Dashboard Routes (Agent Flow #3)
router.get(
  "/dashboard/stats",
  protect,
  authorize("agent"),
  getAgentDashboardStats
);

router.get(
  "/dashboard/overview",
  protect,
  authorize("agent"),
  getDashboardOverview
);

router.get(
  "/dashboard/revenue-analytics",
  protect,
  authorize("agent"),
  getRevenueAnalytics
);

// Agent
router.post("/", protect, authorize("agent"), createAgentProfile);
router.get("/me", protect, authorize("agent"), getMyAgentProfile);

// Admin
router.put("/:id/verify", protect, authorize("admin"), verifyAgent);

// Public
router.get("/:id", getAgentPublicProfile);

export default router;
