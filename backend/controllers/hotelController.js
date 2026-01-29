import Hotel from "../models/hotelModel.js";
import Agent from "../models/agentModel.js";

// @desc    Create a new hotel
// @route   POST /api/hotels
export const createHotel = async (req, res) => {
  try {
    // Ensure the agent exists and belongs to the user
    const agent = await Agent.findOne({ user: req.user._id });
    if (!agent) return res.status(404).json({ message: "Agent profile not found" });

    const hotel = await Hotel.create({
      ...req.body,
      agent: agent._id,
      status: "active" 
    });

    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all hotels for the logged-in agent
// @route   GET /api/hotels/my-hotels
export const getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ agent: req.user.agentId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single hotel details (Public/Agent)
// @route   GET /api/hotels/:id
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("agent");
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update hotel / Room Management
// @route   PUT /api/hotels/:id
export const updateHotel = async (req, res) => {
  try {
    // isAgentOwner middleware will handle the security check
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete/Deactivate Hotel
// @route   DELETE /api/hotels/:id
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Instead of hard delete, we can toggle status per your Agent Flow #7
    hotel.status = "inactive";
    await hotel.save();
    
    res.json({ message: "Hotel deactivated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};