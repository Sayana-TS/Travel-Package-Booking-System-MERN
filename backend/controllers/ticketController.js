import Ticket from "../models/ticketModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

// @desc    Create a new support ticket (User/Agent Flow)
// @route   POST /api/tickets
export const createTicket = async (req, res) => {
  try {
    const { subject, category, priority, message, relatedEntity, onModel } = req.body;

    const ticket = await Ticket.create({
      ticketID: `TK-${Math.random().toString(36).substr(2, 7).toUpperCase()}`,
      user: req.user._id,
      subject,
      category,
      priority,
      relatedEntity,
      onModel,
      conversation: [{
        sender: req.user._id,
        role: req.user.role,
        message
      }]
    });

    // Notify Admin (Admin Flow #2)
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      await Notification.create({
        recipient: admin._id,
        type: "system_alert",
        priority: priority.toLowerCase(),
        title: "New Support Ticket",
        message: `New ${category} ticket: ${subject}`,
        link: `/admin/tickets/${ticket._id}`
      });
    }

    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Add a message to the conversation (Agent/User/Admin Flow)
// @route   POST /api/tickets/:id/message
export const addMessage = async (req, res) => {
  try {
    const { message, attachments } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const newMessage = {
      sender: req.user._id,
      role: req.user.role,
      message,
      attachments
    };

    ticket.conversation.push(newMessage);
    
    // If Admin replies, mark status as Pending (waiting for user)
    // If User replies, mark as Open (waiting for admin)
    ticket.status = req.user.role === "admin" ? "Pending" : "Open";

    await ticket.save();
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Admin: Assign ticket to Agent (Admin Flow #9)
// @route   PATCH /api/tickets/:id/assign
export const assignTicket = async (req, res) => {
  try {
    const { agentId } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo: agentId },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get tickets based on role
// @route   GET /api/tickets
export const getMyTickets = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "user") query = { user: req.user._id };
    if (req.user.role === "agent") query = { assignedTo: req.user.agentId };
    if (req.user.role === "admin") query = {}; // Admin sees all

    const tickets = await Ticket.find(query)
      .populate("user", "name email")
      .populate("assignedTo")
      .sort({ updatedAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};