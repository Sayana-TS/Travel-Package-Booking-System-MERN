import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import {
  getGalleryManagement,
  uploadImages,
  deleteImage,
  setAsFeatured,
  reorderImages,
  bulkDeleteImages,
  getPublicGallery,
  // Add these:
  getDatabaseStatus,
  getHotelImages,
  getPackageImages
} from "../controllers/galleryController.js";

const router = express.Router();

// ============ PUBLIC ROUTES ============
router.get("/public/:entityType/:entityId", getPublicGallery);
router.get("/status", getDatabaseStatus);
router.get("/hotels/:hotelId/images", getHotelImages);
router.get("/packages/:packageId/images", getPackageImages);

// ============ AGENT ROUTES (protected) ============
router.use(protect);
router.use(authorize("agent"));

router.get("/manage", getGalleryManagement);
router.post("/upload", uploadImages);
router.delete("/image/:imageId", deleteImage);
router.patch("/image/:imageId/feature", setAsFeatured);
router.patch("/reorder", reorderImages);
router.delete("/bulk-delete", bulkDeleteImages);

export default router;