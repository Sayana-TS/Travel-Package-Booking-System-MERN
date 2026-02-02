// Utility functions for room management

// Generate room availability calendar
export const generateRoomAvailability = (room, startDate, endDate) => {
    const availability = [];
    const current = new Date(startDate);
    const end = new Date(endDate);
    
    while (current <= end) {
      availability.push({
        date: new Date(current),
        isAvailable: room.status === "available",
        availableRooms: room.availableRooms,
        price: room.pricePerNight
      });
      current.setDate(current.getDate() + 1);
    }
    
    return availability;
  };
  
  // Calculate room revenue
  export const calculateRoomRevenue = (room, period = 'monthly') => {
    // This would integrate with booking system
    // For now, return mock data
    const baseRevenue = room.pricePerNight * 20; // Assume 20 booked nights
    
    return {
      roomId: room.roomId,
      roomTitle: room.title,
      totalRevenue: baseRevenue,
      bookedNights: 20,
      occupancyRate: (20 / 30) * 100, // 30 days in month
      averagePrice: room.pricePerNight
    };
  };
  
  // Validate room data
  export const validateRoomData = (roomData) => {
    const errors = [];
    
    if (!roomData.title || roomData.title.trim().length < 2) {
      errors.push("Room title must be at least 2 characters");
    }
    
    if (!roomData.roomType) {
      errors.push("Room type is required");
    }
    
    if (!roomData.pricePerNight || roomData.pricePerNight <= 0) {
      errors.push("Price per night must be greater than 0");
    }
    
    if (!roomData.maxOccupancy || roomData.maxOccupancy <= 0) {
      errors.push("Max occupancy must be greater than 0");
    }
    
    if (roomData.totalRooms && roomData.totalRooms < 0) {
      errors.push("Total rooms cannot be negative");
    }
    
    if (roomData.availableRooms && roomData.availableRooms < 0) {
      errors.push("Available rooms cannot be negative");
    }
    
    if (roomData.availableRooms > roomData.totalRooms) {
      errors.push("Available rooms cannot exceed total rooms");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  // Format room for display
  export const formatRoomForDisplay = (room, hotelInfo = null) => {
    const formatted = {
      id: room.roomId,
      title: room.title,
      type: room.roomType,
      price: room.pricePerNight,
      status: room.status,
      maxOccupancy: room.maxOccupancy,
      availableRooms: room.availableRooms,
      totalRooms: room.totalRooms,
      description: room.description,
      amenities: room.amenities || [],
      images: room.images || [],
      features: room.features || [],
      createdAt: room.createdAt,
      updatedAt: room.updatedAt
    };
    
    if (hotelInfo) {
      formatted.hotel = hotelInfo;
    }
    
    return formatted;
  };
  
  // Calculate room statistics for a hotel
  export const calculateHotelRoomStats = (rooms) => {
    const stats = {
      totalRooms: rooms.length,
      available: 0,
      unavailable: 0,
      occupied: 0,
      maintenance: 0,
      totalCapacity: 0,
      averagePrice: 0,
      totalAvailableRooms: 0
    };
    
    let totalPrice = 0;
    
    rooms.forEach(room => {
      stats[room.status] = (stats[room.status] || 0) + 1;
      stats.totalCapacity += room.maxOccupancy * room.totalRooms;
      stats.totalAvailableRooms += room.availableRooms;
      totalPrice += room.pricePerNight;
    });
    
    stats.averagePrice = rooms.length > 0 ? totalPrice / rooms.length : 0;
    stats.occupancyRate = stats.totalRooms > 0 
      ? ((stats.totalRooms - stats.available) / stats.totalRooms) * 100 
      : 0;
    
    return stats;
  };