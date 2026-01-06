// models/Agent.js
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    displayName: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifiedAt: {
      type: Date,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    packages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
    ],

    socialLinks: {
      instagram: String,
      facebook: String,
      twitter: String,
      whatsapp: String,
    },

    gallery: {
      landscapes: [String],
      activities: [String],
      cuisine: [String],
      accommodation: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agent", agentSchema);
