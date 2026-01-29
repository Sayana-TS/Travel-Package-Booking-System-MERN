import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import { getDashboardStats, getAllUsersAdmin } from "../controllers/adminController.js";

const router = express.Router();

// All routes here are restricted to Admin
router.use(protect, authorize("admin"));

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsersAdmin);

export default router;