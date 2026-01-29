import User from "../models/userModel.js";
import Package from "../models/packageModel.js";
import Booking from "../models/bookingModel.js";
import Agent from "../models/agentModel.js";

// @desc    Get comprehensive dashboard stats (Admin Flow #2)
// @route   GET /api/admin/dashboard-stats
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Count Users by Role
    const totalCustomers = await User.countDocuments({ role: "user" });
    const totalAgents = await User.countDocuments({ role: "agent" });

    // 2. Count Packages by Status
    const totalPackages = await Package.countDocuments();
    const pendingPackages = await Package.countDocuments({ status: "pending" });

    // 3. Count Bookings
    const totalBookings = await Booking.countDocuments();

    // 4. Calculate Total Revenue using Aggregation
    const revenueData = await Booking.aggregate([
      { $match: { "payment.status": "paid" } }, // Only count successful payments
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price.total" }
        }
      }
    ]);

    // 5. Fetch Recent Package Submissions (Table in Flow #2)
    const recentPackages = await Package.find()
      .populate("agent", "businessName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalCustomers,
        totalAgents,
        totalPackages,
        pendingPackages,
        totalBookings,
        revenue: revenueData[0]?.totalRevenue || 0
      },
      recentPackages
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get Detailed User/Agent List (Admin Flow #3)
// @route   GET /api/admin/users
export const getAllUsersAdmin = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    let filter = {};

    if (role) filter.role = role;
    if (status) filter.isActive = status === "active";
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};