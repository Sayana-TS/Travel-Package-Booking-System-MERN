import Hotel from "../models/hotelModel.js";
import Agent from "../models/agentModel.js";
import mongoose from "mongoose";

// @desc    Get all hotels for room management (Agent Flow #12)
// @route   GET /api/rooms/hotels
// @access  Private (Agent only)
export const getHotelsForRoomManagement = async (req, res) => {
  try {
    const agentId = req.user.agentId;
    
    if (!agentId) {
      return res.status(404).json({
        success: false,
        message: "Agent profile not found"
      });
    }

    const hotels = await Hotel.find({ agent: agentId })
      .select("name images locationMap status rooms")
      .lean();

    // Format hotels for horizontal scroll display
    const formattedHotels = hotels.map(hotel => ({
      id: hotel._id,
      name: hotel.name,
      image: hotel.images.find(img => img.isThumbnail)?.url || hotel.images[0]?.url || "",
      location: hotel.locationMap?.address || hotel.address || "Location not set",
      description: hotel.description ? hotel.description.substring(0, 80) + "..." : "No description",
      totalRooms: hotel.rooms?.length || 0,
      status: hotel.status,
      // Room statistics
      roomStats: {
        total: hotel.rooms?.length || 0,
        available: hotel.rooms?.filter(room => room.status === "available").length || 0,
        occupied: hotel.rooms?.filter(room => room.status === "occupied").length || 0,
        unavailable: hotel.rooms?.filter(room => room.status === "unavailable").length || 0
      }
    }));

    res.status(200).json({
      success: true,
      count: formattedHotels.length,
      hotels: formattedHotels
    });

  } catch (err) {
    console.error("Get hotels for room management error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching hotels",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get rooms for a specific hotel (Agent Flow #12)
// @route   GET /api/rooms/hotel/:hotelId
// @access  Private (Agent only)
export const getHotelRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { search, status, roomType, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    // Verify agent owns the hotel
    const hotel = await Hotel.findOne({
      _id: hotelId,
      agent: req.user.agentId
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found or access denied"
      });
    }

    // Start with all rooms of the hotel
    let rooms = [...hotel.rooms];

    // Apply filters
    if (search) {
      rooms = rooms.filter(room =>
        room.title.toLowerCase().includes(search.toLowerCase()) ||
        room.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status && status !== "all") {
      rooms = rooms.filter(room => room.status === status);
    }

    if (roomType && roomType !== "all") {
      rooms = rooms.filter(room => room.roomType === roomType);
    }

    // Apply sorting
    const sortOptions = {
      priceLow: (a, b) => a.pricePerNight - b.pricePerNight,
      priceHigh: (a, b) => b.pricePerNight - a.pricePerNight,
      createdAt: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      title: (a, b) => a.title.localeCompare(b.title),
      availableRooms: (a, b) => b.availableRooms - a.availableRooms
    };

    const sortFunction = sortOptions[sortBy] || sortOptions.createdAt;
    if (sortOrder === "asc" && sortBy === "createdAt") {
      rooms.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      rooms.sort(sortFunction);
    }

    // Get room types for filter dropdown
    const roomTypes = [...new Set(hotel.rooms.map(room => room.roomType))];

    res.status(200).json({
      success: true,
      hotel: {
        id: hotel._id,
        name: hotel.name,
        totalRooms: hotel.rooms.length
      },
      rooms,
      filters: {
        roomTypes,
        statusOptions: ["available", "unavailable", "occupied", "maintenance"]
      },
      statistics: {
        totalRooms: hotel.rooms.length,
        availableRooms: hotel.rooms.filter(r => r.status === "available").length,
        occupiedRooms: hotel.rooms.filter(r => r.status === "occupied").length,
        unavailableRooms: hotel.rooms.filter(r => r.status === "unavailable").length,
        maintenanceRooms: hotel.rooms.filter(r => r.status === "maintenance").length
      }
    });

  } catch (err) {
    console.error("Get hotel rooms error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching rooms",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Add a new room to hotel (Agent Flow #12)
// @route   POST /api/rooms/hotel/:hotelId
// @access  Private (Agent only)
export const addRoom = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const {
      title,
      roomType,
      pricePerNight,
      totalRooms,
      maxOccupancy,
      description,
      amenities,
      features,
      images,
      status = "available"
    } = req.body;

    // Validate required fields
    if (!title || !roomType || !pricePerNight || !maxOccupancy) {
      return res.status(400).json({
        success: false,
        message: "Title, room type, price per night, and max occupancy are required"
      });
    }

    // Verify agent owns the hotel
    const hotel = await Hotel.findOne({
      _id: hotelId,
      agent: req.user.agentId
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found or access denied"
      });
    }

    // Generate unique room ID
    const roomId = `RM${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create new room object
    const newRoom = {
      roomId,
      title,
      roomType,
      pricePerNight: Number(pricePerNight),
      totalRooms: Number(totalRooms) || 1,
      availableRooms: Number(totalRooms) || 1,
      maxOccupancy: Number(maxOccupancy),
      description,
      amenities: amenities || [],
      images: images || [],
      status,
      features: features || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add room to hotel
    hotel.rooms.push(newRoom);
    
    // Update hotel room statistics
    hotel.markModified('rooms');
    await hotel.save();

    // Get the added room (last in array)
    const addedRoom = hotel.rooms[hotel.rooms.length - 1];

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room: addedRoom,
      hotel: {
        id: hotel._id,
        name: hotel.name,
        totalRooms: hotel.rooms.length
      }
    });

  } catch (err) {
    console.error("Add room error:", err);
    res.status(500).json({
      success: false,
      message: "Error adding room",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Update room details (Agent Flow #12)
// @route   PUT /api/rooms/:roomId
// @access  Private (Agent only)
export const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const updateData = req.body;

    // Find hotel containing the room
    const hotel = await Hotel.findOne({
      "rooms.roomId": roomId,
      agent: req.user.agentId
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Room not found or access denied"
      });
    }

    // Find room index
    const roomIndex = hotel.rooms.findIndex(room => room.roomId === roomId);
    
    if (roomIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    // Preserve immutable fields
    const immutableFields = ['roomId', 'createdAt'];
    immutableFields.forEach(field => {
      if (updateData[field]) delete updateData[field];
    });

    // Handle availableRooms update based on totalRooms change
    if (updateData.totalRooms !== undefined) {
      const currentRoom = hotel.rooms[roomIndex];
      const totalRoomsChange = updateData.totalRooms - currentRoom.totalRooms;
      updateData.availableRooms = Math.max(0, currentRoom.availableRooms + totalRoomsChange);
    }

    // Update room
    hotel.rooms[roomIndex] = {
      ...hotel.rooms[roomIndex].toObject(),
      ...updateData,
      updatedAt: new Date()
    };

    hotel.markModified('rooms');
    await hotel.save();

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: hotel.rooms[roomIndex],
      hotel: {
        id: hotel._id,
        name: hotel.name
      }
    });

  } catch (err) {
    console.error("Update room error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating room",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Delete room (Agent Flow #12)
// @route   DELETE /api/rooms/:roomId
// @access  Private (Agent only)
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find hotel containing the room
    const hotel = await Hotel.findOne({
      "rooms.roomId": roomId,
      agent: req.user.agentId
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Room not found or access denied"
      });
    }

    // Check if room is occupied
    const room = hotel.rooms.find(r => r.roomId === roomId);
    if (room && room.status === "occupied") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete an occupied room"
      });
    }

    // Remove room from array
    hotel.rooms = hotel.rooms.filter(r => r.roomId !== roomId);
    
    hotel.markModified('rooms');
    await hotel.save();

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
      hotel: {
        id: hotel._id,
        name: hotel.name,
        totalRooms: hotel.rooms.length
      }
    });

  } catch (err) {
    console.error("Delete room error:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting room",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get room details (Agent Flow #14 - View modal)
// @route   GET /api/rooms/:roomId/details
// @access  Private (Agent only)
export const getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find hotel containing the room
    const hotel = await Hotel.findOne({
      "rooms.roomId": roomId,
      agent: req.user.agentId
    }).select("name address images rooms");

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Room not found or access denied"
      });
    }

    // Find the specific room
    const room = hotel.rooms.find(r => r.roomId === roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    res.status(200).json({
      success: true,
      room: {
        ...room,
        hotelInfo: {
          id: hotel._id,
          name: hotel.name,
          address: hotel.address,
          mainImage: hotel.images.find(img => img.isThumbnail)?.url || hotel.images[0]?.url
        }
      }
    });

  } catch (err) {
    console.error("Get room details error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching room details",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Update room status (available, unavailable, occupied, maintenance)
// @route   PATCH /api/rooms/:roomId/status
// @access  Private (Agent only)
export const updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status, notes } = req.body;

    if (!status || !["available", "unavailable", "occupied", "maintenance"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required: available, unavailable, occupied, or maintenance"
      });
    }

    // Find hotel containing the room
    const hotel = await Hotel.findOne({
      "rooms.roomId": roomId,
      agent: req.user.agentId
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Room not found or access denied"
      });
    }

    // Find room index
    const roomIndex = hotel.rooms.findIndex(room => room.roomId === roomId);
    
    if (roomIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    // Update status
    const previousStatus = hotel.rooms[roomIndex].status;
    hotel.rooms[roomIndex].status = status;
    hotel.rooms[roomIndex].updatedAt = new Date();
    
    // Add status change note if provided
    if (notes) {
      if (!hotel.rooms[roomIndex].statusNotes) {
        hotel.rooms[roomIndex].statusNotes = [];
      }
      hotel.rooms[roomIndex].statusNotes.push({
        fromStatus: previousStatus,
        toStatus: status,
        notes,
        changedBy: req.user._id,
        changedAt: new Date()
      });
    }

    hotel.markModified('rooms');
    await hotel.save();

    res.status(200).json({
      success: true,
      message: `Room status updated from ${previousStatus} to ${status}`,
      room: hotel.rooms[roomIndex]
    });

  } catch (err) {
    console.error("Update room status error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating room status",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Bulk update rooms (for seasonal changes, maintenance, etc.)
// @route   POST /api/rooms/bulk-update
// @access  Private (Agent only)
export const bulkUpdateRooms = async (req, res) => {
  try {
    const { hotelId, roomIds, updateData, action } = req.body;

    if (!hotelId || !roomIds || !Array.isArray(roomIds)) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID and room IDs array are required"
      });
    }

    // Verify agent owns the hotel
    const hotel = await Hotel.findOne({
      _id: hotelId,
      agent: req.user.agentId
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found or access denied"
      });
    }

    let updatedCount = 0;
    const results = [];

    // Process each room
    for (const roomId of roomIds) {
      const roomIndex = hotel.rooms.findIndex(r => r.roomId === roomId);
      
      if (roomIndex !== -1) {
        const previousData = { ...hotel.rooms[roomIndex].toObject() };
        
        // Apply update based on action
        switch (action) {
          case "updateStatus":
            if (updateData.status) {
              hotel.rooms[roomIndex].status = updateData.status;
            }
            break;
          
          case "updatePrice":
            if (updateData.pricePerNight) {
              hotel.rooms[roomIndex].pricePerNight = updateData.pricePerNight;
            }
            break;
          
          case "updateAvailability":
            if (updateData.availableRooms !== undefined) {
              hotel.rooms[roomIndex].availableRooms = updateData.availableRooms;
            }
            break;
          
          default:
            // General update
            Object.keys(updateData).forEach(key => {
              if (!['roomId', 'createdAt'].includes(key)) {
                hotel.rooms[roomIndex][key] = updateData[key];
              }
            });
        }

        hotel.rooms[roomIndex].updatedAt = new Date();
        updatedCount++;
        
        results.push({
          roomId,
          success: true,
          previous: previousData,
          updated: hotel.rooms[roomIndex]
        });
      } else {
        results.push({
          roomId,
          success: false,
          message: "Room not found in hotel"
        });
      }
    }

    if (updatedCount > 0) {
      hotel.markModified('rooms');
      await hotel.save();
    }

    res.status(200).json({
      success: true,
      message: `Updated ${updatedCount} rooms`,
      totalRequested: roomIds.length,
      updatedCount,
      results
    });

  } catch (err) {
    console.error("Bulk update rooms error:", err);
    res.status(500).json({
      success: false,
      message: "Error performing bulk update",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// @desc    Get room availability for booking dates
// @route   GET /api/rooms/:roomId/availability
// @access  Private (Agent/User)
export const checkRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { checkIn, checkOut, numberOfRooms = 1 } = req.query;

    // Find hotel containing the room
    const hotel = await Hotel.findOne({
      "rooms.roomId": roomId
    }).select("name rooms bookings");

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    // Find the room
    const room = hotel.rooms.find(r => r.roomId === roomId);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    // Basic availability check
    const isAvailable = room.status === "available" && 
                       room.availableRooms >= Number(numberOfRooms);

    // In a real system, you would check against existing bookings for date conflicts
    const availability = {
      isAvailable,
      roomId: room.roomId,
      roomTitle: room.title,
      availableRooms: room.availableRooms,
      requestedRooms: Number(numberOfRooms),
      status: room.status,
      pricePerNight: room.pricePerNight,
      totalPrice: room.pricePerNight * Number(numberOfRooms),
      maxOccupancy: room.maxOccupancy
    };

    // If dates provided, add date-specific info
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      
      availability.checkIn = checkInDate;
      availability.checkOut = checkOutDate;
      availability.nights = nights;
      availability.totalPrice = room.pricePerNight * Number(numberOfRooms) * nights;
    }

    res.status(200).json({
      success: true,
      availability
    });

  } catch (err) {
    console.error("Check room availability error:", err);
    res.status(500).json({
      success: false,
      message: "Error checking room availability",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};