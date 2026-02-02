import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import {
  getSeasonalPricingManagement,
  getPackageSeasonalPricing,
  addSeasonalPricing,
  updateSeasonalPricing,
  deleteSeasonalPricing,
  getPromotionalPackages,
  checkPriceForDates
} from "../controllers/seasonalPricingController.js";

const router = express.Router();

// Public routes
router.get("/promotional", getPromotionalPackages);
router.get("/:packageId/price-check", checkPriceForDates);

// Agent routes (protected)
router.use(protect);
router.use(authorize("agent"));

// Seasonal pricing management
router.get("/manage", getSeasonalPricingManagement);
router.get("/:packageId/seasonal-pricing", getPackageSeasonalPricing);
router.post("/:packageId/seasonal-pricing", addSeasonalPricing);
router.put("/:packageId/seasonal-pricing/:seasonId", updateSeasonalPricing);
router.delete("/:packageId/seasonal-pricing/:seasonId", deleteSeasonalPricing);

export default router;