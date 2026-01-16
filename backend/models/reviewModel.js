// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The traveler who wrote the review
      required: true,
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel", // Dynamic reference
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Package", "Agent"], // Can review the specific trip or the agent/agency
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    // Useful for the Agent Profile "Gallery" and "Satisfaction" stats
    images: [String], 
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Indexing for fast retrieval of all reviews for a specific Agent or Package
reviewSchema.index({ reviewee: 1, onModel: 1 });

export default mongoose.model("Review", reviewSchema);