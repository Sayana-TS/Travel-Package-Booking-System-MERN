// backend/models/hotelModel.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // e.g., "Deluxe", "Suite", "Standard"
  },
  amenities: [String], // ["Wi-Fi", "Air Conditioning", "Breakfast included"]
  pricePerNight: {
    type: Number,
    required: true,
  },
  maxOccupancy: {
    type: Number,
    required: true,
  },
});

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amenities: [String], // general amenities for the hotel
    images: [String], // array of image URLs
    rooms: [roomSchema], // subdocument for rooms
    rating: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
