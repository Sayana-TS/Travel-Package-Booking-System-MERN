import Booking from "../models/bookingModel.js";
import Package from "../models/packageModel.js";
import { updateBookingIfNeeded } from "../utils/updateBookingStatus.js";

export const createBooking = async (req, res) => {
  try {
    const { packageId, travelDates, travelersDetails, specialRequests } = req.body;

    const pkg = await Package.findById(packageId);

    if (!pkg || pkg.status !== "active") {
      return res.status(400).json({
        message: "Package not available for booking"
      });
    }

    const booking = await Booking.create({
      bookingID: `BK-${Date.now()}`,
      user: req.user._id,
      agent: pkg.agent,
      package: pkg._id,
      travelDates,
      numberOfTravelers: travelersDetails.length,
      travelersDetails,
      specialRequests,
      price: {
        packagePrice: pkg.pricing.basePrice,
        total: pkg.pricing.basePrice
      },
      status: "pending",
      timeline: [{ event: "Booking Created" }]
    });

    res.status(201).json(booking);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const confirmBooking = async (req, res) => {
  try {
    // 1. Use findOne with the agent check built into the query for better performance/security
    const booking = await Booking.findOne({ 
      _id: req.params.id, 
      agent: req.user.agentId 
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or unauthorized" });
    }

    // 🔒 Terminal state protection
    if (["canceled", "completed"].includes(booking.status)) {
      return res.status(400).json({
        message: `Cannot confirm a ${booking.status} booking`
      });
    }

    // 2. Validation Checks
    if (booking.payment?.status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Booking is already " + booking.status });
    }

     // 🔒 Already confirmed
     if (booking.status === "confirmed") {
      return res.status(400).json({
        message: "Booking already confirmed"
      });
    }

    // 3. Atomic Updates (Optional but recommended)
    booking.status = "confirmed";
    
    // Ensure timeline exists before pushing
    const timelineEntry = { 
      event: "Booking Confirmed by Agent", 
      timestamp: new Date() // Good practice to add a timestamp
    };
    
    booking.timeline = [...(booking.timeline || []), timelineEntry];

    await booking.save();

    // 4. Return clean data
    res.status(200).json({
      success: true,
      data: booking
    });

  } catch (err) {
    // Log the error internally, but don't always leak full err.message to client
    console.error("Confirm Booking Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

  export const cancelBooking = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // 🔒 Terminal states
    if (["canceled", "completed"].includes(booking.status)) {
      return res.status(400).json({
        message: `Cannot cancel a ${booking.status} booking`
      });
    }
  
      const today = new Date();
      if (new Date(booking.travelDates.start) <= today) {
        return res.status(400).json({
          message: "Cannot cancel after travel starts"
        });
      }
  
      booking.status = "canceled";
      booking.timeline.push({
        event: "BOOKING_CANCELED",
        by: "user",
        timestamp: new Date()
      });
  
      await booking.save();
  
      res.json(booking);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  export const getMyBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user._id })
        .populate("package")
        .sort({ createdAt: -1 });
  
      const updated = [];
      for (let booking of bookings) {
        updated.push(await updateBookingIfNeeded(booking));
      }
  
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const getAgentBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ agent: req.user.agentId })
        .populate("user package")
        .sort({ createdAt: -1 });
  
      const updated = [];
      for (let booking of bookings) {
        updated.push(await updateBookingIfNeeded(booking));
      }
  
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
  export const getBookingById = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate("user agent package");
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      // Access control
      if (
        req.user.role === "user" &&
        booking.user._id.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      if (
        req.user.role === "agent" &&
        booking.agent._id.toString() !== req.user.agentId
      ) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      await updateBookingIfNeeded(booking);
  
      res.json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  // Trigger Agent Notification
await Notification.create({
  recipient: pkg.agent.user, // Reference the User ID associated with the Agent profile
  type: "new_submission",
  priority: "high",
  title: "New Booking Request",
  message: `Sophia Clark (Example) requested a booking for ${pkg.title}.`,
  link: `/agent/bookings/${booking._id}`
});