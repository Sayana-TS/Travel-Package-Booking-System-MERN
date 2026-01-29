import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import {createAgentProfile, getAgentPublicProfile, getMyAgentProfile, verifyAgent} from "../controllers/agentController.js"

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

// Agent
router.post("/", protect, authorize("agent"), createAgentProfile);
router.get("/me", protect, authorize("agent"), getMyAgentProfile);

// Admin
router.put("/:id/verify", protect, authorize("admin"), verifyAgent);

// Public
router.get("/:id", getAgentPublicProfile);

export default router;
