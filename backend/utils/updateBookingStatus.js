import { calculateBookingStatus } from "./bookingStatus.js";

export const updateBookingIfNeeded = async (booking) => {
  const newStatus = calculateBookingStatus(booking);

  if (newStatus !== booking.status) {
    booking.status = newStatus;
    booking.timeline.push({
      event: `Booking marked as ${newStatus}`
    });
    await booking.save();
  }

  return booking;
};
