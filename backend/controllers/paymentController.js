import Booking from "../models/bookingModel.js";

export const makePayment = async (req, res) => {
  try {
    const { bookingId, method, transactionId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message: "Payment not allowed for this booking"
      });
    }

    booking.payment = {
      method,
      status: "paid",
      transactionId
    };

    booking.timeline.push({ event: "Payment Successful" });

    await booking.save();

    res.json({
      message: "Payment recorded. Waiting for agent confirmation.",
      booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
