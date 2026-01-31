import Review from "../models/reviewModel.js";
import Package from "../models/packageModel.js";

// @desc    Add review for a package
// @route   POST /api/reviews/package/:id
export const addPackageReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const pkgId = req.params.id;

    // 1. Create the review
    const review = await Review.create({
      reviewer: req.user._id,
      reviewee: pkgId,
      onModel: "Package",
      rating,
      comment,
    });

    // 2. Recalculate average rating for the Package
    const allReviews = await Review.find({ reviewee: pkgId, onModel: "Package" });
    const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;

    await Package.findByIdAndUpdate(pkgId, { rating: avgRating });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};