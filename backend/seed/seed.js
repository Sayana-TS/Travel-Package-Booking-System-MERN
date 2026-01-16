// backend/seed/seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import seedUsers from "./users.seed.js";

// Load env variables
dotenv.config();

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

const seedAll = async () => {
  try {
    await connectDB();

    console.log("🌱 Seeding started...");

    await seedUsers(); // first seed

    console.log("✅ Seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedAll();
