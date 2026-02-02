import express from "express";
import {
  createPackage,
  approvePackage,
  rejectPackage,
  getPublicPackages,
  deactivatePackage,
  getAllPackagesAdmin,
  getMyPackages,
  getPendingPackages,
  getFeaturedPackages,
  toggleFeatured,
  getPackageCategories,
  searchPackages
} from "../controllers/packageController.js";
import { protect, authorize, isAgentOwner } from "../middlewares/authMiddlewares.js";
import Package from "../models/packageModel.js"
import { getPackageImages } from "../controllers/galleryController.js";
import {
  addSeasonalPricing,
  getPackageSeasonalPricing
} from "../controllers/seasonalPricingController.js";

const router = express.Router();

// Agent
router.post("/", protect, authorize("agent"), createPackage);
router.get("/my", protect, authorize("agent"), getMyPackages);
router.put("/:id/deactivate", protect, authorize("agent", "admin"), deactivatePackage);
router.get("/:id/seasonal-pricing", protect, authorize("agent"), getPackageSeasonalPricing);
router.put("/:id/seasonal-pricing", protect, authorize("agent"), addSeasonalPricing);

// Public
router.get("/", getPublicPackages);
router.get("/featured/list", getFeaturedPackages); // Specifically for Home Page Hero
router.get("/search", searchPackages);
router.get("/categories", getPackageCategories);

// Admin
router.get("/admin/pending", protect, authorize("admin"), getPendingPackages);
router.get("/admin/all", protect, authorize("admin"), getAllPackagesAdmin);
router.put("/:id/approve", protect, authorize("admin"), approvePackage);
router.put("/:id/reject", protect, authorize("admin"), rejectPackage);
router.patch("/:id/featured", protect, authorize("admin"), toggleFeatured);

// Get package images
router.get("/:id/images", getPackageImages);

export default router;
