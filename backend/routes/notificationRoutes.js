import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import { 
  getMyNotifications, 
  markAsRead, 
  clearAllNotifications 
} from "../controllers/notificationController.js";

const router = express.Router();

router.route("/")
  .get(protect, getMyNotifications)
  .delete(protect, clearAllNotifications);

router.patch("/:id/read", protect, markAsRead);

export default router;