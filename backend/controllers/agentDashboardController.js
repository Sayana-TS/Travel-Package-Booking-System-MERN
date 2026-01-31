import Booking from "../models/bookingModel.js";
import Package from "../models/packageModel.js";
import Hotel from "../models/hotelModel.js";
import Agent from "../models/agentModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";

// @desc    Get comprehensive agent dashboard stats (Agent Flow #3)
// @route   GET /api/agents/dashboard/stats
// @access  Private (Agent only)
export const getAgentDashboardStats = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    
    if (!agentId) {
      return res.status(404).json({ 
        success: false, 
        message: "Agent profile not found" 
      });
    }

    // Current date calculations
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // 1. Calculate Total Bookings with trend
    const totalBookings = await Booking.countDocuments({ agent: agentId });
    const currentMonthBookings = await Booking.countDocuments({
      agent: agentId,
      createdAt: { $gte: currentMonthStart }
    });
    const previousMonthBookings = await Booking.countDocuments({
      agent: agentId,
      createdAt: { 
        $gte: previousMonthStart, 
        $lte: previousMonthEnd 
      }
    });

    // Calculate booking trend
    let bookingTrend = "stable";
    let bookingPercentage = 0;
    if (previousMonthBookings > 0) {
      bookingPercentage = ((currentMonthBookings - previousMonthBookings) / previousMonthBookings) * 100;
      bookingTrend = bookingPercentage > 0 ? "up" : bookingPercentage < 0 ? "down" : "stable";
    }

    // 2. Calculate Revenue with trend
    const revenueAggregation = await Booking.aggregate([
      {
        $match: {
          agent: agentId,
          "payment.status": "paid"
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price.total" },
          currentMonthRevenue: {
            $sum: {
              $cond: [
                { $gte: ["$createdAt", currentMonthStart] },
                "$price.total",
                0
              ]
            }
          },
          previousMonthRevenue: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $gte: ["$createdAt", previousMonthStart] },
                    { $lte: ["$createdAt", previousMonthEnd] }
                  ]
                },
                "$price.total",
                0
              ]
            }
          }
        }
      }
    ]);

    const revenueData = revenueAggregation[0] || {
      totalRevenue: 0,
      currentMonthRevenue: 0,
      previousMonthRevenue: 0
    };

    // Calculate revenue trend
    let revenueTrend = "stable";
    let revenuePercentage = 0;
    if (revenueData.previousMonthRevenue > 0) {
      revenuePercentage = ((revenueData.currentMonthRevenue - revenueData.previousMonthRevenue) / revenueData.previousMonthRevenue) * 100;
      revenueTrend = revenuePercentage > 0 ? "up" : revenuePercentage < 0 ? "down" : "stable";
    }

    // 3. Calculate Satisfaction (average rating from reviews)
    const satisfactionAggregation = await Booking.aggregate([
      {
        $match: {
          agent: agentId,
          status: "completed"
        }
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "reviewee",
          as: "reviews"
        }
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$reviews.rating" },
          totalReviews: { $sum: { $cond: [{ $ifNull: ["$reviews", false] }, 1, 0] } }
        }
      }
    ]);

    const satisfactionData = satisfactionAggregation[0] || {
      avgRating: 0,
      totalReviews: 0
    };

    // 4. Package Statistics
    const packageStats = await Package.aggregate([
      {
        $match: { agent: agentId }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert to object for easy access
    const packageStatusCounts = {
      total: await Package.countDocuments({ agent: agentId }),
      pending: 0,
      active: 0,
      upcoming: 0,
      approved: 0,
      rejected: 0,
      inactive: 0
    };

    packageStats.forEach(stat => {
      packageStatusCounts[stat._id] = stat.count;
    });

    // 5. Hotel & Room Statistics
    const hotelStats = await Hotel.aggregate([
      {
        $match: { agent: agentId }
      },
      {
        $project: {
          totalRooms: { $size: "$rooms" },
          activeRooms: {
            $size: {
              $filter: {
                input: "$rooms",
                as: "room",
                cond: { $eq: ["$$room.status", "available"] }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalHotels: { $sum: 1 },
          totalRooms: { $sum: "$totalRooms" },
          activeRooms: { $sum: "$activeRooms" }
        }
      }
    ]);

    const hotelData = hotelStats[0] || {
      totalHotels: 0,
      totalRooms: 0,
      activeRooms: 0
    };

    // 6. Recent Bookings Table (Agent Flow #3)
    const recentBookings = await Booking.find({ agent: agentId })
      .populate({
        path: "user",
        select: "name email"
      })
      .populate({
        path: "package",
        select: "title destination"
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Format recent bookings for table
    const formattedRecentBookings = recentBookings.map(booking => ({
      id: booking._id,
      bookingID: booking.bookingID,
      customer: {
        name: booking.user?.name || "N/A",
        email: booking.user?.email || "N/A"
      },
      destination: booking.package?.destination || "N/A",
      package: booking.package?.title || "N/A",
      status: booking.status,
      date: booking.createdAt,
      amount: booking.price?.total || 0
    }));

    // 7. Managed Hotels (3 popular/recent)
    const managedHotels = await Hotel.find({ agent: agentId })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("name location images rating status")
      .lean();

    // 8. Active Packages (3 popular/recent)
    const activePackages = await Package.find({
      agent: agentId,
      status: { $in: ["active", "upcoming"] }
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title destination travelDates images status rating")
      .lean();

    // 9. System Alerts/Notifications (Agent Flow #3)
    const systemAlerts = await Notification.find({
      recipient: req.user._id,
      isRead: false
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Format alerts
    const formattedAlerts = systemAlerts.map(alert => ({
      id: alert._id,
      type: alert.type,
      title: alert.title,
      message: alert.message,
      priority: alert.priority,
      createdAt: alert.createdAt,
      link: alert.link
    }));

    // Update agent stats in database (async - don't wait for response)
    updateAgentStatsInBackground(agentId, {
      totalBookings,
      monthlyRevenue: revenueData.currentMonthRevenue,
      satisfaction: satisfactionData.avgRating,
      activePackages: packageStatusCounts.active,
      totalHotels: hotelData.totalHotels,
      totalRooms: hotelData.totalRooms,
      previousMonthRevenue: revenueData.previousMonthRevenue,
      bookingTrend
    });

    // Return comprehensive dashboard data
    res.status(200).json({
      success: true,
      stats: {
        // Stats cards data
        totalBookings: {
          value: totalBookings,
          trend: bookingTrend,
          percentage: Math.abs(bookingPercentage).toFixed(1),
          comparison: `vs last month (${previousMonthBookings} bookings)`
        },
        revenue: {
          value: revenueData.totalRevenue,
          monthlyRevenue: revenueData.currentMonthRevenue,
          trend: revenueTrend,
          percentage: Math.abs(revenuePercentage).toFixed(1),
          comparison: `vs last month ($${revenueData.previousMonthRevenue.toFixed(2)})`
        },
        satisfaction: {
          value: satisfactionData.avgRating.toFixed(1),
          totalReviews: satisfactionData.totalReviews,
          trend: satisfactionData.avgRating >= 4 ? "up" : "stable"
        },
        packages: {
          value: packageStatusCounts.total,
          active: packageStatusCounts.active,
          pending: packageStatusCounts.pending,
          upcoming: packageStatusCounts.upcoming
        },
        hotels: {
          value: hotelData.totalHotels,
          rooms: hotelData.totalRooms,
          activeRooms: hotelData.activeRooms
        },
        rooms: {
          value: hotelData.totalRooms,
          available: hotelData.activeRooms,
          occupancyRate: hotelData.totalRooms > 0 
            ? ((hotelData.totalRooms - hotelData.activeRooms) / hotelData.totalRooms * 100).toFixed(1)
            : 0
        }
      },
      recentBookings: formattedRecentBookings,
      managedHotels,
      activePackages,
      systemAlerts: formattedAlerts,
      summary: {
        greeting: `Welcome back, ${req.user.name}!`,
        todayDate: now.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        performanceSummary: getPerformanceSummary(
          bookingTrend, 
          revenueTrend, 
          bookingPercentage, 
          revenuePercentage
        )
      }
    });

  } catch (err) {
    console.error("Agent dashboard error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// Helper function to update agent stats in background
const updateAgentStatsInBackground = async (agentId, stats) => {
  try {
    await Agent.findByIdAndUpdate(agentId, {
      $set: {
        "stats.totalBookings": stats.totalBookings,
        "stats.monthlyRevenue": stats.monthlyRevenue,
        "stats.satisfaction": stats.satisfaction,
        "stats.activePackages": stats.activePackages,
        "stats.totalHotels": stats.totalHotels,
        "stats.totalRooms": stats.totalRooms,
        "stats.previousMonthRevenue": stats.previousMonthRevenue,
        "stats.bookingTrend": stats.bookingTrend
      }
    });
  } catch (err) {
    console.error("Background stats update error:", err);
  }
};

// Helper function for performance summary
const getPerformanceSummary = (bookingTrend, revenueTrend, bookingPercentage, revenuePercentage) => {
  const summaries = [];
  
  if (bookingTrend === "up") {
    summaries.push(`Bookings increased by ${Math.abs(bookingPercentage).toFixed(1)}% this month.`);
  } else if (bookingTrend === "down") {
    summaries.push(`Bookings decreased by ${Math.abs(bookingPercentage).toFixed(1)}% this month.`);
  }
  
  if (revenueTrend === "up") {
    summaries.push(`Revenue up by ${Math.abs(revenuePercentage).toFixed(1)}%.`);
  } else if (revenueTrend === "down") {
    summaries.push(`Revenue down by ${Math.abs(revenuePercentage).toFixed(1)}%.`);
  }
  
  if (summaries.length === 0) {
    summaries.push("Performance is stable this month.");
  }
  
  return summaries.join(" ");
};

// @desc    Get agent dashboard overview (mini-stats for header)
// @route   GET /api/agents/dashboard/overview
// @access  Private (Agent only)
export const getDashboardOverview = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

    // Quick stats
    const todayBookings = await Booking.countDocuments({
      agent: agentId,
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    const pendingPackages = await Package.countDocuments({
      agent: agentId,
      status: "pending"
    });

    const unreadNotifications = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    const activeBookings = await Booking.countDocuments({
      agent: agentId,
      status: { $in: ["pending", "confirmed"] }
    });

    res.status(200).json({
      success: true,
      overview: {
        todayBookings,
        pendingPackages,
        unreadNotifications,
        activeBookings,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error("Dashboard overview error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard overview"
    });
  }
};

// @desc    Get agent revenue analytics (for charts)
// @route   GET /api/agents/dashboard/revenue-analytics
// @access  Private (Agent only)
export const getRevenueAnalytics = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { period = "monthly" } = req.query; // monthly, weekly, yearly

    let groupFormat, matchPeriod;

    switch (period) {
      case "weekly":
        groupFormat = { $week: "$createdAt" };
        matchPeriod = new Date();
        matchPeriod.setDate(matchPeriod.getDate() - 30); // Last 30 days
        break;
      case "yearly":
        groupFormat = { $year: "$createdAt" };
        matchPeriod = new Date();
        matchPeriod.setFullYear(matchPeriod.getFullYear() - 5); // Last 5 years
        break;
      default: // monthly
        groupFormat = { 
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        };
        matchPeriod = new Date();
        matchPeriod.setMonth(matchPeriod.getMonth() - 12); // Last 12 months
    }

    const revenueAnalytics = await Booking.aggregate([
      {
        $match: {
          agent: agentId,
          "payment.status": "paid",
          createdAt: { $gte: matchPeriod }
        }
      },
      {
        $group: {
          _id: groupFormat,
          revenue: { $sum: "$price.total" },
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Format for chart
    const formattedData = revenueAnalytics.map(item => {
      let label;
      if (period === "weekly") {
        label = `Week ${item._id}`;
      } else if (period === "yearly") {
        label = `Year ${item._id}`;
      } else {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        label = `${monthNames[item._id.month - 1]} ${item._id.year}`;
      }

      return {
        period: label,
        revenue: item.revenue,
        bookings: item.bookings
      };
    });

    res.status(200).json({
      success: true,
      period,
      data: formattedData,
      totalRevenue: formattedData.reduce((sum, item) => sum + item.revenue, 0),
      totalBookings: formattedData.reduce((sum, item) => sum + item.bookings, 0)
    });

  } catch (err) {
    console.error("Revenue analytics error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching revenue analytics"
    });
  }
};