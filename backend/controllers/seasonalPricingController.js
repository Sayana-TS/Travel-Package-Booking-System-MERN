import Package from "../models/packageModel.js";
import mongoose from "mongoose";

// @desc    Get seasonal pricing management page (Agent Flow #16)
// @route   GET /api/packages/seasonal-pricing/manage
// @access  Private (Agent only)
export const getSeasonalPricingManagement = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    
    if (!agentId) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found"
      });
    }

    const { hotel, category, date, packageId } = req.query;

    // Build filter for agent's packages
    let filter = { agent: agentId };
    
    // Apply filters if provided
    if (hotel && hotel !== "all") {
      filter["hotels.hotelId"] = hotel;
    }
    
    if (category && category !== "all") {
      filter.tags = { $in: [category] };
    }
    
    if (packageId) {
      filter._id = packageId;
    }

    // Get packages with basic info
    const packages = await Package.find(filter)
      .select("title destination pricing.basePrice pricing.globalDiscount seasonalPricing images status")
      .sort({ title: 1 })
      .lean();

    // Format packages for the management page
    const formattedPackages = packages.map(pkg => {
      // Find active season
      const now = new Date();
      const activeSeason = pkg.seasonalPricing?.find(season => 
        now >= new Date(season.startDate) && now <= new Date(season.endDate)
      );

      // Get upcoming seasons (future dates)
      const upcomingSeasons = pkg.seasonalPricing?.filter(season => 
        new Date(season.startDate) > now
      ) || [];

      // Get past seasons
      const pastSeasons = pkg.seasonalPricing?.filter(season => 
        new Date(season.endDate) < now
      ) || [];

      return {
        id: pkg._id,
        title: pkg.title,
        destination: pkg.destination,
        basePrice: pkg.pricing.basePrice,
        globalDiscount: pkg.pricing.globalDiscount || 0,
        currentPrice: pkg.pricing.basePrice * (1 - (pkg.pricing.globalDiscount || 0) / 100),
        image: pkg.images?.find(img => img.isThumbnail)?.url || pkg.images?.[0]?.url || "",
        status: pkg.status,
        seasonalStats: {
          total: pkg.seasonalPricing?.length || 0,
          active: activeSeason ? 1 : 0,
          upcoming: upcomingSeasons.length,
          past: pastSeasons.length
        },
        activeSeason: activeSeason ? {
          seasonName: activeSeason.seasonName,
          discount: activeSeason.discountPercentage,
          finalPrice: activeSeason.finalPrice,
          startDate: activeSeason.startDate,
          endDate: activeSeason.endDate
        } : null
      };
    });

    // Get unique categories for filter dropdown
    const categories = await Package.distinct("tags", { agent: agentId });

    // Get hotels for filter dropdown (from agent's packages)
    const hotels = await Package.aggregate([
      { $match: { agent: agentId, "hotels.hotelId": { $exists: true } } },
      { $unwind: "$hotels" },
      { $group: { _id: "$hotels.hotelId" } },
      { $lookup: {
          from: "hotels",
          localField: "_id",
          foreignField: "_id",
          as: "hotelInfo"
        }
      },
      { $unwind: "$hotelInfo" },
      { $project: {
          id: "$_id",
          name: "$hotelInfo.name",
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      success: true,
      packages: formattedPackages,
      filters: {
        categories: categories.filter(cat => cat).sort(),
        hotels: hotels.map(h => ({ id: h.id, name: h.name })),
        dateRanges: [
          { id: "thisMonth", name: "This Month" },
          { id: "next3Months", name: "Next 3 Months" },
          { id: "thisYear", name: "This Year" }
        ]
      },
      summary: {
        totalPackages: formattedPackages.length,
        packagesWithSeasonalPricing: formattedPackages.filter(p => p.seasonalStats.total > 0).length,
        activeSeasonalOffers: formattedPackages.filter(p => p.activeSeason).length
      }
    });

  } catch (err) {
    console.error("Get seasonal pricing management error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching seasonal pricing data",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get seasonal pricing for a specific package (Agent Flow #16)
// @route   GET /api/packages/:packageId/seasonal-pricing
// @access  Private (Agent only)
export const getPackageSeasonalPricing = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { packageId } = req.params;

    if (!agentId) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found"
      });
    }

    // Verify agent owns the package
    const packageDoc = await Package.findOne({
      _id: packageId,
      agent: agentId
    }).select("title pricing.basePrice pricing.globalDiscount seasonalPricing");

    if (!packageDoc) {
      return res.status(404).json({
        success: false,
        message: "Package not found or access denied"
      });
    }

    const now = new Date();
    const seasonalPricing = packageDoc.seasonalPricing || [];

    // Categorize seasons
    const activeSeasons = seasonalPricing.filter(season => 
      now >= new Date(season.startDate) && now <= new Date(season.endDate)
    );

    const upcomingSeasons = seasonalPricing.filter(season => 
      new Date(season.startDate) > now
    );

    const pastSeasons = seasonalPricing.filter(season => 
      new Date(season.endDate) < now
    );

    // Calculate savings for each season
    const formatSeason = (season) => ({
      id: season._id,
      seasonName: season.seasonName,
      startDate: season.startDate,
      endDate: season.endDate,
      discountPercentage: season.discountPercentage,
      basePrice: season.basePrice || packageDoc.pricing.basePrice,
      finalPrice: season.finalPrice,
      savingsAmount: (season.basePrice || packageDoc.pricing.basePrice) - season.finalPrice,
      savingsPercentage: season.discountPercentage,
      isActive: now >= new Date(season.startDate) && now <= new Date(season.endDate),
      createdAt: season.createdAt,
      updatedAt: season.updatedAt
    });

    res.status(200).json({
      success: true,
      package: {
        id: packageDoc._id,
        title: packageDoc.title,
        basePrice: packageDoc.pricing.basePrice,
        globalDiscount: packageDoc.pricing.globalDiscount || 0
      },
      seasonalPricing: {
        active: activeSeasons.map(formatSeason),
        upcoming: upcomingSeasons.map(formatSeason),
        past: pastSeasons.map(formatSeason),
        all: seasonalPricing.map(formatSeason)
      },
      statistics: {
        totalSeasons: seasonalPricing.length,
        activeCount: activeSeasons.length,
        upcomingCount: upcomingSeasons.length,
        pastCount: pastSeasons.length,
        averageDiscount: seasonalPricing.length > 0 
          ? seasonalPricing.reduce((sum, season) => sum + season.discountPercentage, 0) / seasonalPricing.length
          : 0
      }
    });

  } catch (err) {
    console.error("Get package seasonal pricing error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching seasonal pricing",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Add seasonal pricing to package (Agent Flow #17)
// @route   POST /api/packages/:packageId/seasonal-pricing
// @access  Private (Agent only)
export const addSeasonalPricing = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { packageId } = req.params;
    const { seasonName, startDate, endDate, discountPercentage } = req.body;

    // Validate required fields
    if (!seasonName || !startDate || !endDate || discountPercentage === undefined) {
      return res.status(400).json({
        success: false,
        message: "seasonName, startDate, endDate, and discountPercentage are required"
      });
    }

    // Validate discount percentage
    if (discountPercentage < 0 || discountPercentage > 100) {
      return res.status(400).json({
        success: false,
        message: "Discount percentage must be between 0 and 100"
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "Start date must be before end date"
      });
    }

    if (end < now) {
      return res.status(400).json({
        success: false,
        message: "Cannot add seasonal pricing for past dates"
      });
    }

    // Verify agent owns the package
    const packageDoc = await Package.findOne({
      _id: packageId,
      agent: agentId
    });

    if (!packageDoc) {
      return res.status(404).json({
        success: false,
        message: "Package not found or access denied"
      });
    }

    // Check for date conflicts with existing seasonal pricing
    const hasConflict = packageDoc.seasonalPricing?.some(season => {
      const existingStart = new Date(season.startDate);
      const existingEnd = new Date(season.endDate);
      
      // Check if date ranges overlap
      return (start <= existingEnd && end >= existingStart);
    });

    if (hasConflict) {
      return res.status(400).json({
        success: false,
        message: "Date range conflicts with existing seasonal pricing"
      });
    }

    // Calculate final price
    const basePrice = packageDoc.pricing.basePrice;
    const discountAmount = basePrice * (discountPercentage / 100);
    const finalPrice = basePrice - discountAmount;

    // Create new season object
    const newSeason = {
      seasonName,
      startDate: start,
      endDate: end,
      discountPercentage,
      basePrice: basePrice, // Store snapshot of current base price
      finalPrice,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to package
    if (!packageDoc.seasonalPricing) {
      packageDoc.seasonalPricing = [];
    }
    
    packageDoc.seasonalPricing.push(newSeason);
    await packageDoc.save();

    // Get the added season (last in array)
    const addedSeason = packageDoc.seasonalPricing[packageDoc.seasonalPricing.length - 1];

    res.status(201).json({
      success: true,
      message: "Seasonal pricing added successfully",
      season: {
        id: addedSeason._id,
        seasonName: addedSeason.seasonName,
        startDate: addedSeason.startDate,
        endDate: addedSeason.endDate,
        discountPercentage: addedSeason.discountPercentage,
        basePrice: addedSeason.basePrice,
        finalPrice: addedSeason.finalPrice,
        savingsAmount: addedSeason.basePrice - addedSeason.finalPrice,
        isActive: addedSeason.isActive
      },
      package: {
        id: packageDoc._id,
        title: packageDoc.title,
        seasonalCount: packageDoc.seasonalPricing.length
      }
    });

  } catch (err) {
    console.error("Add seasonal pricing error:", err);
    res.status(500).json({
      success: false,
      message: "Error adding seasonal pricing",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Update seasonal pricing (Agent Flow #16)
// @route   PUT /api/packages/:packageId/seasonal-pricing/:seasonId
// @access  Private (Agent only)
export const updateSeasonalPricing = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { packageId, seasonId } = req.params;
    const updateData = req.body;

    // Verify agent owns the package
    const packageDoc = await Package.findOne({
      _id: packageId,
      agent: agentId
    });

    if (!packageDoc) {
      return res.status(404).json({
        success: false,
        message: "Package not found or access denied"
      });
    }

    // Find the season to update
    const seasonIndex = packageDoc.seasonalPricing.findIndex(
      season => season._id.toString() === seasonId
    );

    if (seasonIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Seasonal pricing not found"
      });
    }

    const season = packageDoc.seasonalPricing[seasonIndex];
    const now = new Date();
    const seasonStart = new Date(season.startDate);
    
    // Prevent updating past seasons
    if (seasonStart < now && !updateData.seasonName) {
      return res.status(400).json({
        success: false,
        message: "Cannot update past seasonal pricing"
      });
    }

    // Validate dates if being updated
    if (updateData.startDate || updateData.endDate) {
      const startDate = updateData.startDate ? new Date(updateData.startDate) : new Date(season.startDate);
      const endDate = updateData.endDate ? new Date(updateData.endDate) : new Date(season.endDate);

      if (startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: "Start date must be before end date"
        });
      }

      // Check for date conflicts with other seasons (excluding current one)
      const hasConflict = packageDoc.seasonalPricing.some((existingSeason, index) => {
        if (index === seasonIndex) return false;
        
        const existingStart = new Date(existingSeason.startDate);
        const existingEnd = new Date(existingSeason.endDate);
        
        return (startDate <= existingEnd && endDate >= existingStart);
      });

      if (hasConflict) {
        return res.status(400).json({
          success: false,
          message: "Date range conflicts with existing seasonal pricing"
        });
      }
    }

    // Calculate new final price if discount is updated
    let finalPrice = season.finalPrice;
    if (updateData.discountPercentage !== undefined) {
      if (updateData.discountPercentage < 0 || updateData.discountPercentage > 100) {
        return res.status(400).json({
          success: false,
          message: "Discount percentage must be between 0 and 100"
        });
      }
      
      const basePrice = season.basePrice || packageDoc.pricing.basePrice;
      const discountAmount = basePrice * (updateData.discountPercentage / 100);
      finalPrice = basePrice - discountAmount;
    }

    // Update season
    packageDoc.seasonalPricing[seasonIndex] = {
      ...season.toObject(),
      ...updateData,
      finalPrice: updateData.discountPercentage !== undefined ? finalPrice : season.finalPrice,
      updatedAt: new Date()
    };

    await packageDoc.save();

    const updatedSeason = packageDoc.seasonalPricing[seasonIndex];

    res.status(200).json({
      success: true,
      message: "Seasonal pricing updated successfully",
      season: {
        id: updatedSeason._id,
        seasonName: updatedSeason.seasonName,
        startDate: updatedSeason.startDate,
        endDate: updatedSeason.endDate,
        discountPercentage: updatedSeason.discountPercentage,
        basePrice: updatedSeason.basePrice,
        finalPrice: updatedSeason.finalPrice,
        savingsAmount: updatedSeason.basePrice - updatedSeason.finalPrice,
        isActive: updatedSeason.isActive
      }
    });

  } catch (err) {
    console.error("Update seasonal pricing error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating seasonal pricing",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Delete seasonal pricing (Agent Flow #16)
// @route   DELETE /api/packages/:packageId/seasonal-pricing/:seasonId
// @access  Private (Agent only)
export const deleteSeasonalPricing = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    const { packageId, seasonId } = req.params;

    // Verify agent owns the package
    const packageDoc = await Package.findOne({
      _id: packageId,
      agent: agentId
    });

    if (!packageDoc) {
      return res.status(404).json({
        success: false,
        message: "Package not found or access denied"
      });
    }

    // Find the season to delete
    const seasonIndex = packageDoc.seasonalPricing.findIndex(
      season => season._id.toString() === seasonId
    );

    if (seasonIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Seasonal pricing not found"
      });
    }

    const season = packageDoc.seasonalPricing[seasonIndex];
    const now = new Date();
    const seasonStart = new Date(season.startDate);
    
    // Prevent deleting active or past seasons (only allow deleting future seasons)
    if (seasonStart <= now) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete active or past seasonal pricing"
      });
    }

    // Remove the season
    packageDoc.seasonalPricing.splice(seasonIndex, 1);
    await packageDoc.save();

    res.status(200).json({
      success: true,
      message: "Seasonal pricing deleted successfully",
      deletedSeason: {
        id: seasonId,
        seasonName: season.seasonName,
        startDate: season.startDate,
        endDate: season.endDate
      },
      package: {
        id: packageDoc._id,
        title: packageDoc.title,
        remainingSeasons: packageDoc.seasonalPricing.length
      }
    });

  } catch (err) {
    console.error("Delete seasonal pricing error:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting seasonal pricing",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get packages with highest seasonal discounts (for promotional banner)
// @route   GET /api/packages/seasonal/promotional
// @access  Public
export const getPromotionalPackages = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const now = new Date();

    // Find packages with active seasonal pricing
    const packages = await Package.aggregate([
      {
        $match: {
          status: { $in: ["active", "upcoming"] },
          "seasonalPricing": { $exists: true, $not: { $size: 0 } }
        }
      },
      {
        $addFields: {
          activeSeason: {
            $filter: {
              input: "$seasonalPricing",
              as: "season",
              cond: {
                $and: [
                  { $gte: [now, "$$season.startDate"] },
                  { $lte: [now, "$$season.endDate"] }
                ]
              }
            }
          }
        }
      },
      {
        $match: {
          "activeSeason.0": { $exists: true }
        }
      },
      {
        $addFields: {
          currentSeason: { $arrayElemAt: ["$activeSeason", 0] },
          currentPrice: {
            $subtract: [
              "$pricing.basePrice",
              {
                $multiply: [
                  "$pricing.basePrice",
                  { $divide: [{ $arrayElemAt: ["$activeSeason.discountPercentage", 0] }, 100] }
                ]
              }
            ]
          },
          discountPercentage: { $arrayElemAt: ["$activeSeason.discountPercentage", 0] }
        }
      },
      {
        $sort: { "discountPercentage": -1 } // Sort by highest discount
      },
      {
        $limit: parseInt(limit)
      },
      {
        $project: {
          title: 1,
          destination: 1,
          summary: 1,
          images: 1,
          pricing: 1,
          currentSeason: 1,
          currentPrice: 1,
          discountPercentage: 1,
          savingsAmount: {
            $subtract: ["$pricing.basePrice", "$currentPrice"]
          }
        }
      }
    ]);

    // Format response
    const formattedPackages = packages.map(pkg => ({
      id: pkg._id,
      title: pkg.title,
      destination: pkg.destination,
      description: pkg.summary?.substring(0, 100) + "...",
      image: pkg.images?.find(img => img.isThumbnail)?.url || pkg.images?.[0]?.url || "",
      basePrice: pkg.pricing.basePrice,
      currentPrice: pkg.currentPrice,
      discountPercentage: pkg.discountPercentage,
      savingsAmount: pkg.savingsAmount,
      seasonName: pkg.currentSeason?.seasonName || "Seasonal Offer",
      seasonEndDate: pkg.currentSeason?.endDate,
      isLimited: true // For promotional banner display
    }));

    res.status(200).json({
      success: true,
      count: formattedPackages.length,
      packages: formattedPackages,
      promotionalMessage: formattedPackages.length > 0
        ? `Summer SALE - Up to ${Math.max(...formattedPackages.map(p => p.discountPercentage))}% OFF!`
        : "No current seasonal offers"
    });

  } catch (err) {
    console.error("Get promotional packages error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching promotional packages",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Check price for specific dates (for booking page)
// @route   GET /api/packages/:packageId/price-check
// @access  Public
export const checkPriceForDates = async (req, res) => {
  try {
    const { packageId } = req.params;
    const { startDate, endDate, travelers = 1 } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "startDate and endDate are required"
      });
    }

    const packageDoc = await Package.findById(packageId)
      .select("title pricing seasonalPricing maxTravelers");

    if (!packageDoc) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    // Check if package can accommodate travelers
    if (packageDoc.maxTravelers && travelers > packageDoc.maxTravelers) {
      return res.status(400).json({
        success: false,
        message: `Package can only accommodate ${packageDoc.maxTravelers} travelers`
      });
    }

    const checkStart = new Date(startDate);
    const checkEnd = new Date(endDate);
    
    // Find seasonal pricing for the check dates
    const seasonForDates = packageDoc.seasonalPricing?.find(season => {
      const seasonStart = new Date(season.startDate);
      const seasonEnd = new Date(season.endDate);
      
      // Check if any day in the booking range falls within the season
      return (checkStart <= seasonEnd && checkEnd >= seasonStart);
    });

    let pricePerPerson = packageDoc.pricing.basePrice;
    let discountPercentage = packageDoc.pricing.globalDiscount || 0;
    let seasonName = null;

    if (seasonForDates) {
      pricePerPerson = seasonForDates.finalPrice;
      discountPercentage = seasonForDates.discountPercentage;
      seasonName = seasonForDates.seasonName;
    } else if (packageDoc.pricing.globalDiscount > 0) {
      pricePerPerson = packageDoc.pricing.basePrice * (1 - packageDoc.pricing.globalDiscount / 100);
    }

    // Calculate duration in days
    const durationDays = Math.ceil((checkEnd - checkStart) / (1000 * 60 * 60 * 24));
    const totalPrice = pricePerPerson * travelers;

    res.status(200).json({
      success: true,
      package: {
        id: packageDoc._id,
        title: packageDoc.title
      },
      pricing: {
        basePrice: packageDoc.pricing.basePrice,
        pricePerPerson,
        discountPercentage,
        seasonName,
        travelers: parseInt(travelers),
        durationDays,
        totalPrice,
        breakdown: {
          perPerson: pricePerPerson,
          subtotal: pricePerPerson * travelers,
          discountAmount: (packageDoc.pricing.basePrice - pricePerPerson) * travelers,
          finalTotal: totalPrice
        }
      },
      dates: {
        start: checkStart,
        end: checkEnd,
        duration: `${durationDays} days`
      }
    });

  } catch (err) {
    console.error("Check price for dates error:", err);
    res.status(500).json({
      success: false,
      message: "Error checking price",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};