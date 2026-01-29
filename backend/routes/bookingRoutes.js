import express from "express";
import {
  createBooking,
  confirmBooking,
  cancelBooking,
  getMyBookings,
  getAgentBookings,
  getBookingById
} from "../controllers/bookingController.js";

import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.put("/:id/confirm", protect, authorize("agent"), confirmBooking);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/my", protect, getMyBookings);
router.get("/agent", protect, authorize("agent"), getAgentBookings);
router.get("/:id", protect, getBookingById);

export default router;
