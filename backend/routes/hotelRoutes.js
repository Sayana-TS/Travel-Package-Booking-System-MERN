import express from "express";
import { 
  createHotel, 
  getMyHotels, 
  getHotelById, 
  updateHotel, 
  deleteHotel 
} from "../controllers/hotelController.js";
import { protect, authorize, isAgentOwner } from "../middlewares/authMiddlewares.js";
import Hotel from "../models/hotelModel.js";
import { getHotelImages } from "../controllers/galleryController.js";

const router = express.Router();

// Agent Routes
router.post("/", protect, authorize("agent"), createHotel);
router.get("/my-hotels", protect, authorize("agent"), getMyHotels);

// Detail & Update (isAgentOwner ensures security)
router.get("/:id", getHotelById);
router.put("/:id", protect, authorize("agent"), isAgentOwner(Hotel), updateHotel);
router.delete("/:id", protect, authorize("agent"), isAgentOwner(Hotel), deleteHotel);

// Get hotel images
router.get("/:id/images", getHotelImages);

export default router;