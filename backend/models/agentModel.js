// models/Agent.js - The Professional Business Profile
import mongoose from "mongoose";


const agentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  businessName: { type: String, required: true },
  about: String,
  location: { city: String, country: String },
  expertise: [String], // adventure, honeymoon, etc.
  operatingRegion: String,
  socialLinks: { whatsapp: String, instagram: String, website: String },
  verification: {
    licenseNumber: String,
    licenseImage: String,
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "active", "inactive"], default: "pending" }, // For Admin Step 3
    verifiedAt: Date
  },
  gallery: {
    landscapes: [String],
    activities: [String],
    cuisine: [String],
    accommodation: [String]
  },
  stats: {
    satisfaction: { type: Number, default: 0 },
  monthlyRevenue: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },
  activePackages: { type: Number, default: 0 },
  totalHotels: { type: Number, default: 0 },
  totalRooms: { type: Number, default: 0 },
  // For trend calculation
  previousMonthRevenue: { type: Number, default: 0 },
  bookingTrend: { type: String, enum: ["up", "down", "stable"], default: "stable" }
  }
}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);