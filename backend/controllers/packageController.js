import Package from "../models/packageModel.js";
import { calculatePackageStatus } from "../utils/packageStatus.js";
import Notification from "../models/notificationModel.js"

export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create({
      ...req.body,
      agent: req.user.agentId,
      status: "pending",
      submittedAt: new Date()
    });

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
 
  
  // @desc    Update Package with Seasonal Pricing (Agent Flow #16/17)
// @route   PUT /api/packages/:id/seasonal-pricing
export const addSeasonalPricing = async (req, res) => {
  try {
    const { seasonName, startDate, endDate, discountPercentage } = req.body;
    const pkg = await Package.findById(req.params.id);

    if (!pkg) return res.status(404).json({ message: "Package not found" });

    // Logic: Calculate final price based on base price and discount
    const discountAmount = pkg.pricing.basePrice * (discountPercentage / 100);
    const finalPrice = pkg.pricing.basePrice - discountAmount;

    const newSeason = {
      seasonName,
      startDate,
      endDate,
      discountPercentage,
      finalPrice
    };

    pkg.seasonalPricing.push(newSeason);
    await pkg.save();

    res.status(200).json({ message: "Seasonal pricing added", pkg });
  } catch (err) {
    res.status(400).json({ message: err.message });
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

// Trigger Admin Notification
const AdminUser = await User.findOne({ role: "admin" }); // Simplest way to find an admin
if (AdminUser) {
  await Notification.create({
    recipient: AdminUser._id,
    type: "approval_required",
    priority: "medium",
    title: "New Package Submitted",
    message: `"${pkg.title}" by ${req.user.name} is waiting for approval.`,
    link: `/admin/packages`
  });
}