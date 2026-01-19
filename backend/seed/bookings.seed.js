// seeds/bookings.seed.js

import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Agent from "../models/agentModel.js";
import Package from "../models/packageModel.js";

const seedBookings = async () => {
  console.log("Seeding bookings...");

  // Fetch required references
  const users = await User.find();
  const agents = await Agent.find();
  const packages = await Package.find();

  if (!users.length || !agents.length || !packages.length) {
    throw new Error("Users / Agents / Packages missing. Seed them first.");
  }

  await Booking.deleteMany();
  console.log("Old bookings cleared");

  const bookings = [
    {
      bookingID: "BK-1001",
      user: users[0]._id,
      agent: agents[0]._id,
      package: packages[0]._id,

      travelDates: {
        start: new Date("2026-03-10"),
        end: new Date("2026-03-15")
      },

      numberOfTravelers: 2,
      travelersDetails: [
        {
          name: "Sayana T S",
          age: 22,
          email: "sayana@example.com",
          phone: "9876543210"
        },
        {
          name: "Friend One",
          age: 23
        }
      ],

      specialRequests: "Need a room with good view",
      customerNotes: "First international trip",

      price: {
        packagePrice: 45000,
        taxesFees: 5000,
        total: 50000
      },

      payment: {
        method: "credit_card",
        cardNumber: "**** **** **** 4242",
        expiry: "12/27",
        status: "completed",
        transactionId: "TXN123456"
      },

      status: "confirmed",
      timeline: [
        { event: "Booking Created" },
        { event: "Payment Received" },
        { event: "Booking Confirmed" }
      ]
    }
  ];

  await Booking.insertMany(bookings);
  console.log("Bookings seeded successfully");
};

export default seedBookings;
