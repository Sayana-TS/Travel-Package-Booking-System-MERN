import Agent from "../models/agentModel.js";
import Booking from "../models/bookingModel.js";
import Package from "../models/packageModel.js";
import Hotel from "../models/hotelModel.js";

// Function to update all agent stats (can be called periodically)
export const updateAllAgentStats = async () => {
  try {
    const agents = await Agent.find();
    
    for (const agent of agents) {
      await updateSingleAgentStats(agent._id);
    }
    
    console.log(`Updated stats for ${agents.length} agents`);
  } catch (err) {
    console.error("Error updating all agent stats:", err);
  }
};

// Update stats for a single agent
export const updateSingleAgentStats = async (agentId) => {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // Calculate stats
    const totalBookings = await Booking.countDocuments({ agent: agentId });
    
    const revenueData = await Booking.aggregate([
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

    const revenue = revenueData[0] || {
      totalRevenue: 0,
      currentMonthRevenue: 0,
      previousMonthRevenue: 0
    };

    const activePackages = await Package.countDocuments({
      agent: agentId,
      status: { $in: ["active", "upcoming"] }
    });

    const totalHotels = await Hotel.countDocuments({ agent: agentId });
    
    const hotelRooms = await Hotel.aggregate([
      { $match: { agent: agentId } },
      { $unwind: "$rooms" },
      { $group: { _id: null, totalRooms: { $sum: 1 } } }
    ]);

    const totalRooms = hotelRooms[0]?.totalRooms || 0;

    // Calculate trend
    let bookingTrend = "stable";
    if (revenue.previousMonthRevenue > 0) {
      const percentage = ((revenue.currentMonthRevenue - revenue.previousMonthRevenue) / revenue.previousMonthRevenue) * 100;
      bookingTrend = percentage > 0 ? "up" : percentage < 0 ? "down" : "stable";
    }

    // Update agent document
    await Agent.findByIdAndUpdate(agentId, {
      $set: {
        "stats.totalBookings": totalBookings,
        "stats.monthlyRevenue": revenue.currentMonthRevenue,
        "stats.activePackages": activePackages,
        "stats.totalHotels": totalHotels,
        "stats.totalRooms": totalRooms,
        "stats.previousMonthRevenue": revenue.previousMonthRevenue,
        "stats.bookingTrend": bookingTrend
      }
    });

    return { success: true, agentId };
  } catch (err) {
    console.error(`Error updating stats for agent ${agentId}:`, err);
    return { success: false, error: err.message };
  }
};

// Call this periodically (e.g., using node-cron)
export const scheduleStatsUpdate = () => {
  // Update every day at 2 AM
  // cron.schedule('0 2 * * *', updateAllAgentStats);
  console.log("Stats update scheduler initialized");
};