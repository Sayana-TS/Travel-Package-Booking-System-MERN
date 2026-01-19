// models/Package.js
import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  title: { type: String, required: true },
  destination: { type: String, required: true },
  travelDates: { start: Date, end: Date },
  maxTravelers: Number,
  summary: { type: String, maxLength: 1500 }, // ~250 words
  highlights: [String],
  tags: [String],
  
  // Multiple hotels can be selected per package
  hotels: [{
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    roomType: String,
    pricePerNight: Number
  }],

  activities: [{
    name: String,
    description: String,
    image: String,
    duration: String,
    time: String
  }],

  itinerary: [{ day: Number, title: String, description: String }],

  transportation: [{
    serviceType: { type: String, enum: ["airport pickup/drop", "local transfer", "shuttle service"] },
    vehicleCategory: String,
    departureSchedule: String,
    duration: String,
    route: String,
    note: String
  }],

  weatherForecast: {
    daily: [{ date: Date, condition: String, temp: Number, humidity: Number, wind: Number, note: String }],
    averageTemp: Number,
    seasonalContext: String
  },

  pricing: {
    basePrice: Number,
    pricePer: { type: String, enum: ["person", "package", "group"] },
    currency: String,
    globalDiscount: { type: Number, default: 0 }
  },

  // Section 16/17: Seasonal Pricing
  seasonalPricing: [{
    seasonName: String,
    startDate: Date,
    endDate: Date,
    discountPercentage: Number,
    finalPrice: Number
  }],

  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected", "upcoming", "active", "inactive"], 
    default: "pending" 
  },

  isFeatured: { type: Boolean, default: false }, // For User Home Page (Admin Step 4)
  adminNotes: String, // Reason for rejection
  submittedAt: { type: Date, default: Date.now }, // Tracking for Step 2

  inclusions: [String],
  exclusions: [String],
  images: [{ url: String, isThumbnail: { type: Boolean, default: false } }],
  completionPercentage: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);