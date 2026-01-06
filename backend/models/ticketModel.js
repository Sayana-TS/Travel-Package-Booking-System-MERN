// backend/models/ticketModel.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: false, // optional if the ticket is general
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: false, // optional if assigned to an agent
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Booking Enquiry", "Payment Issue", "General Question", "Other"],
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Pending", "Resolved", "Closed"],
      default: "Open",
    },
    responses: [
      {
        responder: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "responses.onModel", // can be User, Agent, or Admin
        },
        onModel: {
          type: String,
          required: true,
          enum: ["User", "Agent", "Admin"],
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
