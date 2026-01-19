// backend/seed/agents.seed.js
import Agent from "../models/agentModel.js";
import User from "../models/userModel.js";

const seedAgents = async () => {
  try {
    // Clear existing agents
    await Agent.deleteMany();
    console.log("🗑️ Agents collection cleared");

    // Find users with role = agent
    const agentUsers = await User.find({ role: "agent" });

    if (agentUsers.length === 0) {
      console.log("⚠️ No agent users found. Skipping agent seeding.");
      return;
    }

    const agents = agentUsers.map((user, index) => ({
      user: user._id,
      businessName: `Travel Experts ${index + 1}`,
      about:
        "We specialize in curated travel experiences with a focus on comfort, safety, and unforgettable memories.",
      location: {
        city: "Kochi",
        country: "India",
      },
      expertise: ["adventure", "honeymoon", "family"],
      operatingRegion: "South India & International",
      socialLinks: {
        whatsapp: "+91XXXXXXXXXX",
        instagram: "https://instagram.com/travelexperts",
        website: "https://travelexperts.com",
      },
      verification: {
        licenseNumber: `LIC-${1000 + index}`,
        isVerified: true,
        status: "active",
        verifiedAt: new Date(),
      },
      gallery: {
        landscapes: [],
        activities: [],
        cuisine: [],
        accommodation: [],
      },
      stats: {
        satisfaction: 4.5,
        monthlyRevenue: 0,
      },
    }));

    await Agent.insertMany(agents);
    console.log("🧳 Agents seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding agents", error);
    throw error;
  }
};

export default seedAgents;
