export const calculateBookingStatus = (booking) => {
    const today = new Date();
    const travelEnd = new Date(booking.travelDates.end);
  
    if (booking.status === "canceled") return "canceled";
  
    if (travelEnd < today) return "completed";
  
    return booking.status;
  };
  