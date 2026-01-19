// seeds/tickets.seed.js

import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import Agent from "../models/agentModel.js";
import Package from "../models/packageModel.js";
import Booking from "../models/bookingModel.js";

const seedTickets = async () => {
  console.log("Seeding tickets...");

  const users = await User.find();
  const agents = await Agent.find();
  const packages = await Package.find();
  const bookings = await Booking.find();

  if (!users.length || !agents.length) {
    throw new Error("Users / Agents missing. Seed them first.");
  }

  await Ticket.deleteMany();
  console.log("Old tickets cleared");

  const tickets = [
    // --- Package Related Ticket ---
    {
      ticketID: "TCK-1001",
      user: users[0]._id,
      assignedTo: agents[0]._id,
      relatedEntity: packages[0]?._id,
      onModel: "Package",
      subject: "Clarification about itinerary",
      category: "General Inquiry",
      priority: "Medium",
      status: "Open",
      conversation: [
        {
          sender: users[0]._id,
          role: "user",
          message: "Can you explain what activities are included on Day 3?"
        }
      ]
    },

    // --- Booking Related Ticket ---
    {
      ticketID: "TCK-1002",
      user: users[0]._id,
      assignedTo: agents[0]._id,
      relatedEntity: bookings[0]?._id,
      onModel: "Booking",
      subject: "Payment confirmation issue",
      category: "Payment",
      priority: "High",
      status: "Pending",
      conversation: [
        {
          sender: users[0]._id,
          role: "user",
          message: "Payment was done but status still shows pending."
        },
        {
          sender: agents[0]._id,
          role: "agent",
          message: "We are checking this with our payment team."
        }
      ]
    }
  ];

  await Ticket.insertMany(tickets);
  console.log("Tickets seeded successfully");
};

export default seedTickets;
