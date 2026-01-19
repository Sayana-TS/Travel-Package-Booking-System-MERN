// backend/seed/seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import seedUsers from "./users.seed.js";
import seedAgents from "./agents.seed.js";
import seedHotels from "./hotels.seed.js";
import seedPackages from "./packages.seed.js";
import seedBookings from "./bookings.seed.js";
import seedReviews from "./reviews.seed.js";
import seedTickets from "./tickets.seed.js";
import seedNotifications from "./notifications.seed.js";

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
    await seedAgents(); // second seed
    await seedHotels(); // third seed
    await seedPackages(); // fourth seed
    await seedBookings(); // fifth seed
    await seedReviews(); // sixth seed
    await seedTickets(); // seventh seed
    await seedNotifications(); // eighth seed
    
    console.log("✅ Seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedAll();
