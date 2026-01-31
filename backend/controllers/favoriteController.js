import User from "../models/userModel.js";
import Package from "../models/packageModel.js";

// @desc    Add package to favorites
// @route   POST /api/favorites/:packageId
// @access  Private (User only)
export const addToFavorites = async (req, res) => {
  try {
    // Check if user is a regular user (not agent/admin for favorites)
    if (req.user.role !== "user") {
      return res.status(403).json({ 
        message: "Only regular users can add favorites" 
      });
    }

    const packageId = req.params.packageId;
    
    // Verify package exists and is active
    const packageExists = await Package.findOne({
      _id: packageId,
      status: { $in: ["active", "upcoming"] }
    });

    if (!packageExists) {
      return res.status(404).json({ 
        message: "Package not found or not available" 
      });
    }

    const user = await User.findById(req.user._id);
    
    // Check if already in favorites
    if (user.favorites.includes(packageId)) {
      return res.status(400).json({ 
        message: "Package already in favorites" 
      });
    }

    // Add to favorites
    user.favorites.push(packageId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Package added to favorites",
      favoritesCount: user.favorites.length,
      favorites: user.favorites
    });

  } catch (err) {
    console.error("Add to favorites error:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: process.env.NODE_ENV === "development" ? err.message : undefined 
    });
  }
};

// @desc    Remove package from favorites
// @route   DELETE /api/favorites/:packageId
// @access  Private (User only)
export const removeFromFavorites = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ 
        message: "Only regular users can manage favorites" 
      });
    }

    const packageId = req.params.packageId;
    const user = await User.findById(req.user._id);

    // Check if package is in favorites
    if (!user.favorites.includes(packageId)) {
      return res.status(400).json({ 
        message: "Package not in favorites" 
      });
    }

    // Remove from favorites
    user.favorites = user.favorites.filter(
      favId => favId.toString() !== packageId
    );
    
    await user.save();

    res.status(200).json({
      success: true,
      message: "Package removed from favorites",
      favoritesCount: user.favorites.length,
      favorites: user.favorites
    });

  } catch (err) {
    console.error("Remove from favorites error:", err);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get user's favorite packages
// @route   GET /api/favorites
// @access  Private (User only)
export const getMyFavorites = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ 
        message: "Only regular users can view favorites" 
      });
    }

    const user = await User.findById(req.user._id)
      .populate({
        path: 'favorites',
        match: { status: { $in: ["active", "upcoming"] } }, // Only show available packages
        populate: [
          { path: 'agent', select: 'businessName user' },
          { path: 'agent.user', select: 'name profileImage' }
        ],
        select: 'title destination travelDates pricing images rating highlights tags'
      })
      .select('favorites');

    // Filter out null packages (if any were deleted)
    const validFavorites = user.favorites.filter(pkg => pkg !== null);

    // Sort by added date (most recent first)
    const sortedFavorites = validFavorites.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json({
      success: true,
      count: sortedFavorites.length,
      favorites: sortedFavorites
    });

  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Check if package is in favorites
// @route   GET /api/favorites/check/:packageId
// @access  Private (User only)
export const checkFavoriteStatus = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ 
        message: "Only regular users can check favorites" 
      });
    }

    const packageId = req.params.packageId;
    const user = await User.findById(req.user._id);

    const isFavorite = user.favorites.some(
      favId => favId.toString() === packageId
    );

    res.status(200).json({
      success: true,
      isFavorite,
      packageId
    });

  } catch (err) {
    console.error("Check favorite error:", err);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};