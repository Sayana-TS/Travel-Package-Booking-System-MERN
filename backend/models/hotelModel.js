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
  rooms: [{
    roomType: String,
    pricePerNight: Number,
    totalRooms: Number,
    maxOccupancy: Number,
    description: String,
    amenities: [String],
    images: [String],
    status: { type: String, enum: ["available", "unavailable", "occupied"], default: "available" }
  }],
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);