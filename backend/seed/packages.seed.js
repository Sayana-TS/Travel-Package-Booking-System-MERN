// backend/seed/packages.seed.js
import Package from "../models/packageModel.js";
import Agent from "../models/agentModel.js";
import Hotel from "../models/hotelModel.js";

const seedPackages = async () => {
  try {
    // Clear existing packages
    await Package.deleteMany();
    console.log("🗑️ Packages collection cleared");

    const agents = await Agent.find();

    if (agents.length === 0) {
      console.log("⚠️ No agents found. Skipping package seeding.");
      return;
    }

    const packages = [];

    for (const agent of agents) {
      // Fetch hotels belonging to this agent
      const hotels = await Hotel.find({ agent: agent._id });

      if (hotels.length === 0) continue;

      packages.push({
        agent: agent._id,
        title: "Munnar Nature Escape",
        destination: "Munnar, Kerala",
        travelDates: {
          start: new Date("2025-10-01"),
          end: new Date("2025-10-05"),
        },
        maxTravelers: 10,
        summary:
          "Experience the calm beauty of Munnar with misty hills, tea gardens, waterfalls, and peaceful nature stays.",
        highlights: [
          "Tea plantation walk",
          "Sunrise viewpoint",
          "Local cuisine experience",
        ],
        tags: ["nature", "hill station", "relaxation"],

        hotels: hotels.map((hotel) => ({
          hotelId: hotel._id,
          roomType: hotel.rooms[0]?.roomType || "Standard",
          pricePerNight: hotel.rooms[0]?.pricePerNight || 3000,
        })),

        activities: [
          {
            name: "Tea Garden Walk",
            description: "Guided walk through lush tea plantations.",
            image: "/images/activities/tea-walk.jpg",
            duration: "2 hours",
            time: "Morning",
          },
          {
            name: "Waterfall Visit",
            description: "Visit the most scenic waterfalls in Munnar.",
            image: "/images/activities/waterfall.jpg",
            duration: "3 hours",
            time: "Afternoon",
          },
        ],

        itinerary: [
          {
            day: 1,
            title: "Arrival & Local Sightseeing",
            description: "Arrival, hotel check-in, evening local tour.",
          },
          {
            day: 2,
            title: "Nature Exploration",
            description: "Tea gardens, viewpoints, waterfalls.",
          },
          {
            day: 3,
            title: "Leisure Day",
            description: "Relax at the resort or optional activities.",
          },
        ],

        transportation: [
          {
            serviceType: "airport pickup/drop",
            vehicleCategory: "SUV",
            departureSchedule: "On Arrival",
            duration: "3 hours",
            route: "Kochi → Munnar",
            note: "Comfortable AC vehicle",
          },
        ],

        weatherForecast: {
          averageTemp: 22,
          seasonalContext: "Pleasant weather with light mist",
        },

        pricing: {
          basePrice: 12000,
          pricePer: "person",
          currency: "INR",
          globalDiscount: 5,
        },

        seasonalPricing: [
          {
            seasonName: "Monsoon Offer",
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-08-31"),
            discountPercentage: 10,
            finalPrice: 10800,
          },
        ],

        inclusions: [
          "Accommodation",
          "Daily Breakfast",
          "Sightseeing",
          "Airport Pickup & Drop",
        ],
        exclusions: ["Lunch & Dinner", "Personal expenses"],

        images: [
          { url: "/images/packages/munnar1.jpg", isThumbnail: true },
          { url: "/images/packages/munnar2.jpg" },
        ],

        status: "approved",
        isFeatured: true,
        completionPercentage: 90,
      });
    }

    await Package.insertMany(packages);
    console.log("📦 Packages seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding packages", error);
    throw error;
  }
};

export default seedPackages;
