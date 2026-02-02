import Package from "../models/packageModel.js";
import { calculatePackageStatus } from "../utils/packageStatus.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js"

export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create({
      ...req.body,
      agent: req.user.agentId,
      status: "pending",
      submittedAt: new Date()
    });

    // --- NOTIFICATION LOGIC MOVED INSIDE ---
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      await Notification.create({
        recipient: admin._id,
        type: "approval_required",
        priority: "medium",
        title: "New Package Submitted",
        message: `"${pkg.title}" by ${req.user.name} is waiting for approval.`,
        link: `/admin/packages`
      });
    }

    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const approvePackage = async (req, res) => {
    try {
      const pkg = await Package.findById(req.params.id);
  
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
  
      if (pkg.status !== "pending") {
        return res.status(400).json({
          message: "Only pending packages can be approved"
        });
      }
  
      pkg.status = calculatePackageStatus({
        ...pkg.toObject(),
        status: "approved"
      });
  
      await pkg.save();
      res.json(pkg);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  
  export const rejectPackage = async (req, res) => {
    const { adminNotes } = req.body;
  
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
  
    pkg.status = "rejected";
    pkg.adminNotes = adminNotes;
  
    await pkg.save();
    res.json(pkg);
  };

  
  export const getPublicPackages = async (req, res) => {
    const packages = await Package.find({
      status: { $in: ["approved", "active", "upcoming"] }
    }).populate("agent");
  
    const updatedPackages = [];
  
    for (let pkg of packages) {
      const newStatus = calculatePackageStatus(pkg);
  
      if (pkg.status !== newStatus) {
        pkg.status = newStatus;
        await pkg.save();
      }
  
      if (["active", "upcoming"].includes(pkg.status)) {
        updatedPackages.push(pkg);
      }
    }
  
    res.json(updatedPackages);
  };
  
  

  export const getMyPackages = async (req, res) => {
    try {
      const packages = await Package.find({
        agent: req.user.agentId
      }).sort({ createdAt: -1 });
  
      res.json(packages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
  export const getPendingPackages = async (req, res) => {
    try {
      const packages = await Package.find({ status: "pending" })
        .populate("agent")
        .sort({ submittedAt: -1 });
  
      res.json(packages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
  export const getAllPackagesAdmin = async (req, res) => {
    try {
      const packages = await Package.find()
        .populate("agent")
        .sort({ createdAt: -1 });
  
      res.json(packages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
  export const deactivatePackage = async (req, res) => {
    try {
      const pkg = await Package.findById(req.params.id);
  
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
  
      // Admin can deactivate anything
      if (
        req.user.role !== "admin" &&
        pkg.agent.toString() !== req.user.agentId
      ) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      pkg.status = "inactive";
      await pkg.save();
  
      res.json(pkg);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
 

// @desc    Toggle Featured Status (Admin Flow #4)
// @route   PATCH /api/packages/:id/featured
export const toggleFeatured = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    pkg.isFeatured = !pkg.isFeatured;
    await pkg.save();

    res.json({ message: `Package featured status: ${pkg.isFeatured}`, pkg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get Featured Packages for Hero Section (User Flow #2)
// @route   GET /api/packages/featured
export const getFeaturedPackages = async (req, res) => {
  try {
    const featured = await Package.find({ 
      isFeatured: true, 
      status: "active" 
    }).limit(6); // Limit for the landing page grid
    
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Search and filter packages (User Flow #4)
// @route   GET /api/packages/search
// @access  Public
export const searchPackages = async (req, res) => {
  try {
    const {
      q, // General search query
      destination,
      minPrice,
      maxPrice,
      category, // Could be tag or category
      startDate,
      endDate,
      travelers,
      duration, // min days
      rating,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 12,
      agentId,
      featured,
      upcomingOnly = false
    } = req.query;

    // Base filter - only show active/upcoming packages
    let filter = { 
      status: upcomingOnly ? "upcoming" : { $in: ["active", "upcoming"] } 
    };

    // Text search (package title, destination, description)
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { destination: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } }
      ];
    }

    // Destination filter
    if (destination) {
      filter.destination = { $regex: destination, $options: "i" };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter["pricing.basePrice"] = {};
      if (minPrice) filter["pricing.basePrice"].$gte = Number(minPrice);
      if (maxPrice) filter["pricing.basePrice"].$lte = Number(maxPrice);
    }

    // Category/Tags filter
    if (category) {
      filter.$or = [
        { tags: { $in: [category] } },
        { "pricing.category": category }
      ];
    }

    // Date range filter
    if (startDate && endDate) {
      filter.$and = [
        { "travelDates.start": { $lte: new Date(endDate) } },
        { "travelDates.end": { $gte: new Date(startDate) } }
      ];
    } else if (startDate) {
      filter["travelDates.start"] = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter["travelDates.end"] = { $lte: new Date(endDate) };
    }

    // Travelers filter
    if (travelers) {
      filter.maxTravelers = { $gte: Number(travelers) };
    }

    // Duration filter (minimum days)
    if (duration) {
      // This would require calculating duration from travelDates
      // For now, we'll filter by date range difference
      filter["$expr"] = {
        $gte: [
          { $divide: [{ $subtract: ["$travelDates.end", "$travelDates.start"] }, 1000 * 60 * 60 * 24] },
          Number(duration)
        ]
      };
    }

    // Rating filter
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // Agent filter
    if (agentId) {
      filter.agent = agentId;
    }

    // Featured filter
    if (featured === "true") {
      filter.isFeatured = true;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Sort options
    const sortOptions = {
      popularity: { rating: -1, bookingsCount: -1 },
      "price-low": { "pricing.basePrice": 1 },
      "price-high": { "pricing.basePrice": -1 },
      "newest": { createdAt: -1 },
      "date-asc": { "travelDates.start": 1 },
      "date-desc": { "travelDates.start": -1 }
    };

    const sort = sortOptions[sortBy] || { createdAt: -1 };

    // Execute query with pagination
    const packages = await Package.find(filter)
      .populate({
        path: "agent",
        select: "businessName user verification",
        populate: {
          path: "user",
          select: "name profileImage"
        }
      })
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .lean(); // Use lean for better performance

    // Get total count for pagination
    const total = await Package.countDocuments(filter);

    // Calculate current price with seasonal discounts
    const packagesWithCurrentPrice = packages.map(pkg => {
      const now = new Date();
      let currentPrice = pkg.pricing.basePrice;
      
      // Apply global discount
      if (pkg.pricing.globalDiscount > 0) {
        currentPrice = currentPrice * (1 - pkg.pricing.globalDiscount / 100);
      }
      
      // Check for seasonal pricing
      if (pkg.seasonalPricing && pkg.seasonalPricing.length > 0) {
        const activeSeason = pkg.seasonalPricing.find(season => {
          const start = new Date(season.startDate);
          const end = new Date(season.endDate);
          return now >= start && now <= end;
        });
        
        if (activeSeason) {
          currentPrice = activeSeason.finalPrice;
        }
      }
      
      return {
        ...pkg,
        currentPrice: Math.round(currentPrice),
        isDiscounted: currentPrice < pkg.pricing.basePrice,
        discountPercentage: currentPrice < pkg.pricing.basePrice 
          ? Math.round((1 - currentPrice / pkg.pricing.basePrice) * 100)
          : 0
      };
    });

    res.status(200).json({
      success: true,
      count: packagesWithCurrentPrice.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      packages: packagesWithCurrentPrice,
      filters: {
        destination,
        priceRange: { min: minPrice, max: maxPrice },
        category,
        dateRange: { start: startDate, end: endDate },
        travelers,
        sortBy
      }
    });

  } catch (err) {
    console.error("Search packages error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error searching packages",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get package categories/tags for filter dropdowns
// @route   GET /api/packages/categories
// @access  Public
export const getPackageCategories = async (req, res) => {
  try {
    const categories = await Package.aggregate([
      { $match: { status: { $in: ["active", "upcoming"] } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    const destinations = await Package.aggregate([
      { $match: { status: { $in: ["active", "upcoming"] } } },
      { $group: { _id: "$destination", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);

    res.status(200).json({
      success: true,
      categories: categories.map(cat => ({ name: cat._id, count: cat.count })),
      destinations: destinations.map(dest => ({ 
        name: dest._id, 
        count: dest.count 
      }))
    });

  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ 
      success: false,
      message: "Error fetching categories"
    });
  }
};