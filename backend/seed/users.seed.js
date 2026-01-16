// backend/seed/users.seed.js

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany();
    console.log("🗑️ Users collection cleared");

    const users = [
      {
        name: "Admin User",
        email: "admin@travel.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
      {
        name: "Test User",
        email: "user@travel.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
      },
    ];

    await User.insertMany(users);
    console.log("👤 Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users", error);
    throw error;
  }
};

export default seedUsers;
