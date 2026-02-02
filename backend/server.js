import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB(); // 🔥 FIRST — DB CONNECTS

    const app = express();
    app.use(cors());
    app.use(express.json());

    // 🔥 IMPORT ROUTES ONLY AFTER DB CONNECTS
    const authRoutes = (await import("./routes/authRoutes.js")).default;
    const userRoutes = (await import("./routes/userRoutes.js")).default;
    const agentRoutes = (await import("./routes/agentRoutes.js")).default;
    const packageRoutes = (await import("./routes/packageRoutes.js")).default;
    const paymentRoutes = (await import("./routes/paymentRoutes.js")).default;
    const hotelRoutes = (await import("./routes/hotelRoutes.js")).default;
    const bookingRoutes = (await import("./routes/bookingRoutes.js")).default;
    const notificationRoutes = (await import("./routes/notificationRoutes.js")).default;
    const ticketRoutes = (await import("./routes/ticketRoutes.js")).default;
    const adminRoutes = (await import("./routes/adminRoutes.js")).default;
    const reviewRoutes = (await import("./routes/reviewRoutes.js")).default;
    const favoriteRoutes = (await import("./routes/favoriteRoutes.js")).default;
    const roomRoutes = (await import("./routes/roomRoutes.js")).default;
    const galleryRoutes = (await import("./routes/galleryRoutes.js")).default;
    const seasonalPricingRoutes = (await import("./routes/seasonalPricingRoutes.js")).default;

    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/agents", agentRoutes);
    app.use("/api/packages", packageRoutes);
    app.use("/api/payment", paymentRoutes);
    app.use("/api/hotels", hotelRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/notification", notificationRoutes);
    app.use("/api/tickets", ticketRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/reviews", reviewRoutes);
    app.use("/api/favorites", favoriteRoutes);
    app.use("/api/rooms", roomRoutes);
    app.use("/api/gallery", galleryRoutes);
    app.use("/api/seasonal-pricing", seasonalPricingRoutes);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
