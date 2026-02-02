// models/Hotel.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  name: { type: String, required: true },
  address: String,
  city: String,
  category: String, // Luxury Resort, Apartment, etc.
  description: String,
  amenities: [String],
  images: [{ url: String, isThumbnail: { type: Boolean, default: false } }],
  locationMap: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  // Update the rooms array in hotelSchema:
rooms: [{
  roomId: { type: String, unique: true, default: () => `RM${Date.now()}${Math.random().toString(36).substr(2, 5)}` },
  title: { type: String, required: true },
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  totalRooms: { type: Number, required: true, default: 1 },
  availableRooms: { type: Number, default: 1 },
  maxOccupancy: { type: Number, required: true, default: 2 },
  description: String,
  amenities: [String],
  images: [String],
  status: { 
    type: String, 
    enum: ["available", "unavailable", "occupied", "maintenance"], 
    default: "available" 
  },
  features: [{
    name: String,
    included: { type: Boolean, default: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}],
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);