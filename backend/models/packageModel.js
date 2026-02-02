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
    seasonName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discountPercentage: { 
      type: Number, 
      required: true,
      min: 0,
      max: 100,
      default: 0
    },
    basePrice: { type: Number, required: true }, // Snapshot of price when season was created
    finalPrice: { type: Number, required: true },
    isActive: { 
      type: Boolean, 
      default: function() {
        const now = new Date();
        return now >= this.startDate && now <= this.endDate;
      }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
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

// Add this before the export
packageSchema.pre('save', function(next) {
  if (this.weatherForecast.daily.length > 0) {
    const totalTemp = this.weatherForecast.daily.reduce((acc, day) => acc + day.temp, 0);
    this.weatherForecast.averageTemp = totalTemp / this.weatherForecast.daily.length;
  }
  next();
});

// Add a pre-save hook to update isActive status
packageSchema.pre('save', function(next) {
  if (this.seasonalPricing && this.seasonalPricing.length > 0) {
    const now = new Date();
    this.seasonalPricing.forEach(season => {
      season.isActive = now >= season.startDate && now <= season.endDate;
      season.updatedAt = new Date();
    });
  }
  next();
});

// Add a virtual for current active seasonal price
packageSchema.virtual('currentSeasonalPrice').get(function() {
  if (!this.seasonalPricing || this.seasonalPricing.length === 0) {
    return null;
  }
  
  const now = new Date();
  const activeSeason = this.seasonalPricing.find(season => 
    now >= season.startDate && now <= season.endDate
  );
  
  return activeSeason || null;
});

// Add a virtual for current discounted price
packageSchema.virtual('currentPrice').get(function() {
  const basePrice = this.pricing.basePrice;
  
  // Check for active seasonal pricing
  const activeSeason = this.currentSeasonalPrice;
  if (activeSeason) {
    return activeSeason.finalPrice;
  }
  
  // Apply global discount if any
  if (this.pricing.globalDiscount > 0) {
    return basePrice * (1 - this.pricing.globalDiscount / 100);
  }
  
  return basePrice;
});

// Add a method to calculate price for specific date
packageSchema.methods.getPriceForDate = function(date) {
  const basePrice = this.pricing.basePrice;
  const targetDate = new Date(date);
  
  // Check for seasonal pricing on that date
  const seasonForDate = this.seasonalPricing.find(season => 
    targetDate >= season.startDate && targetDate <= season.endDate
  );
  
  if (seasonForDate) {
    return seasonForDate.finalPrice;
  }
  
  // Apply global discount if any
  if (this.pricing.globalDiscount > 0) {
    return basePrice * (1 - this.pricing.globalDiscount / 100);
  }
  
  return basePrice;
};

export default mongoose.model("Package", packageSchema);