// backend/models/reviewModel.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who wrote the review
      required: true,
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel", // can be either Package or Agent
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Package", "Agent"], // specifies what this review belongs to
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

const Review = mongoose.model("Review", reviewSchema);
export default Review;
