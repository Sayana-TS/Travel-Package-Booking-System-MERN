import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import {
  getHotelsForRoomManagement,
  getHotelRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomDetails,
  updateRoomStatus,
  bulkUpdateRooms,
  checkRoomAvailability
} from "../controllers/roomController.js";

const router = express.Router();

// All routes require agent authentication
router.use(protect);
router.use(authorize("agent"));

// Get hotels for room management (horizontal scroll - Agent Flow #12)
router.get("/hotels", getHotelsForRoomManagement);

// Get rooms for a specific hotel with filters (Agent Flow #12)
router.get("/hotel/:hotelId", getHotelRooms);

// Room CRUD operations
router.post("/hotel/:hotelId", addRoom);
router.put("/:roomId", updateRoom);
router.delete("/:roomId", deleteRoom);

// Room details and status management
router.get("/:roomId/details", getRoomDetails);
router.patch("/:roomId/status", updateRoomStatus);

// Bulk operations
router.post("/bulk-update", bulkUpdateRooms);

// Availability check (also accessible to users for booking)
router.get("/:roomId/availability", checkRoomAvailability);

export default router;