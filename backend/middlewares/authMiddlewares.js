import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Agent from '../models/agentModel.js'
import Booking from '../models/bookingModel.js'

// 🔐 AUTHENTICATION
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (req.user.role === "agent") {
        const agent = await Agent.findOne({ user: req.user._id });
        if (agent) {
          req.user.agentId = agent._id;
        }
      }
      

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// 🪪 AUTHORIZATION (ROLE CHECK)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Not authorized to access this resource",
      });
    }

    next();
  };
};


export const isUserOwner = (Model, paramId = "id") => {
  return async (req, res, next) => {
    try {
      // Admin bypass
      if (req.user.role === "admin") {
        return next();
      }

      const resource = await Model.findById(req.params[paramId]);

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      if (resource.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.resource = resource; // optional reuse
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};



export const isAgentOwner = (Model, paramId = "id") => {
  return async (req, res, next) => {
    try {
      // Admin bypass
      if (req.user.role === "admin") {
        return next();
      }

      if (req.user.role !== "agent") {
        return res.status(403).json({ message: "Agent access only" });
      }

      const agent = await Agent.findOne({ user: req.user._id });

      if (!agent) {
        return res.status(404).json({ message: "Agent profile not found" });
      }

      const resource = await Model.findById(req.params[paramId]);

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      if (resource.agent.toString() !== agent._id.toString()) {
        return res.status(403).json({ message: "Not your resource" });
      }

      req.agent = agent;
      req.resource = resource;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

export const isAgentBookingOwner = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }

    if (req.user.role !== "agent") {
      return res.status(403).json({ message: "Agent access only" });
    }

    const agent = await Agent.findOne({ user: req.user._id });

    const booking = await Booking.findById(req.params.id).populate("agent");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.agent._id.toString() !== agent._id.toString()) {
      return res.status(403).json({ message: "Not your booking" });
    }

    req.booking = booking;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};