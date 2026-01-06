import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    // ======================
    // BASIC INFO
    // ======================
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["beach", "mountain", "adventure", "relaxation", "city", "wildlife"],
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    duration: {
      type: String, // "5 Days / 4 Nights"
      required: true,
    },

    // ======================
    // PRICING
    // ======================
    pricePerPerson: {
      type: Number,
      required: true,
    },

    discountPercent: {
      type: Number,
      default: 0,
    },

    // ======================
    // MEDIA & LABELS
    // ======================
    coverImage: {
      type: String,
      required: true,
    },

    gallery: [String],

    labels: [
      {
        type: String,
        enum: ["popular", "featured", "mostLoved", "budget"],
      },
    ],

    // ======================
    // PACKAGE DETAILS
    // ======================
    highlights: [String],

    inclusions: [String],

    exclusions: [String],

    activities: [
      {
        title: String,
        duration: String,
        schedule: String,
        description: String,
        image: String,
      },
    ],

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],

    transportation: {
      vehicle: String,
      serviceType: String,
      pickupDrop: String,
      note: String,
    },

    // ======================
    // HOTEL (REFERENCE)
    // ======================
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },

    // ======================
    // RATINGS & REVIEWS
    // ======================
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // ======================
    // AVAILABILITY
    // ======================
    availableDates: [Date],

    maxTravelers: {
      type: Number,
      default: 10,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "soldOut"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);
