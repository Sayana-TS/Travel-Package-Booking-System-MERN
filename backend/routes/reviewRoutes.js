import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import { addPackageReview } from "../controllers/reviewController.js";
import Review from "../models/reviewModel.js";

const router = express.Router();

// @desc    Add a review to a package
// @route   POST /api/reviews/package/:id
// @access  Private (Travelers only)
router.post("/package/:id", protect, addPackageReview);

// @desc    Get all reviews for a specific package (Public)
// @route   GET /api/reviews/package/:id
router.get("/package/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.id })
      .populate("reviewer", "name profileImage")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;