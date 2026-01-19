// backend/seed/users.seed.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const seedUsers = async () => {
  try {
    // 1. Clear existing users to avoid unique email conflicts
    await User.deleteMany();
    console.log("🗑️ Users collection cleared");

    // 2. Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);
    const agentPassword = await bcrypt.hash("agent123", 10);

    const users = [
      {
        name: "Main Admin",
        email: "admin@travel.com",
        password: adminPassword,
        role: "admin",
        phone: "+1234567890",
        profileImage: "https://ui-avatars.com/api/?name=Admin+User&background=056bd1&color=fff",
        authProvider: "local",
        isActive: true,
        lastLogin: new Date(),
      },
      {
        name: "John Traveler",
        email: "user@travel.com",
        password: userPassword,
        role: "user",
        phone: "+1987654321",
        profileImage: "https://ui-avatars.com/api/?name=John+Traveler",
        authProvider: "local",
        isActive: true,
        favorites: [], // Starts empty
        lastLogin: new Date(),
      },
      {
        name: "Elite Travel Agency",
        email: "agent@travel.com",
        password: agentPassword,
        role: "agent",
        phone: "+1122334455",
        profileImage: "https://ui-avatars.com/api/?name=Elite+Agency&background=0f1923&color=fff",
        authProvider: "local",
        isActive: true,
        lastLogin: new Date(),
      },
      {
        name: "Inactive Agent",
        email: "inactive@travel.com",
        password: agentPassword,
        role: "agent",
        phone: "+000000000",
        profileImage: "",
        authProvider: "local",
        isActive: false, // Useful for testing Admin "Inactive" filters
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      }
    ];

    await User.insertMany(users);
    console.log("👤 Users seeded successfully with full profiles");
    
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
};

export default seedUsers;