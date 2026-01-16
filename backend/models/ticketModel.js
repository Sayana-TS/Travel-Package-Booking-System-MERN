// backend/models/ticketModel.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketID: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  relatedEntity: { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" },
  onModel: { type: String, enum: ["Package", "Booking"] },
  subject: String,
  category: { type: String, enum: ["Technical Issue", "Booking", "Payment", "General Inquiry"] },
  priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"] },
  status: { type: String, enum: ["Open", "Pending", "Resolved", "Closed"], default: "Open" },
  conversation: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, enum: ["user", "agent", "admin"], default: "user" },
    message: String,
    attachments: [String],
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
