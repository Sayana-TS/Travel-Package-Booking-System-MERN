// backend/seed/hotels.seed.js
import Hotel from "../models/hotelModel.js";
import Agent from "../models/agentModel.js";

const seedHotels = async () => {
  try {
    // Clear existing hotels
    await Hotel.deleteMany();
    console.log("🗑️ Hotels collection cleared");

    // Fetch agents
    const agents = await Agent.find();

    if (agents.length === 0) {
      console.log("⚠️ No agents found. Skipping hotel seeding.");
      return;
    }

    const hotels = [];

    agents.forEach((agent, index) => {
      hotels.push(
        {
          agent: agent._id,
          name: `Green Valley Resort ${index + 1}`,
          address: "Hill View Road, Munnar",
          city: "Munnar",
          category: "Luxury Resort",
          description:
            "A peaceful luxury resort surrounded by lush greenery and breathtaking mountain views.",
          amenities: [
            "Free WiFi",
            "Swimming Pool",
            "Restaurant",
            "Spa",
            "Parking",
          ],
          images: [
            { url: "/images/hotels/resort1.jpg", isThumbnail: true },
            { url: "/images/hotels/resort2.jpg" },
          ],
          locationMap: {
            latitude: 10.0889,
            longitude: 77.0595,
            address: "Munnar, Kerala, India",
          },
          rooms: [
            {
              roomType: "Deluxe Room",
              pricePerNight: 4500,
              totalRooms: 10,
              maxOccupancy: 2,
              description: "Spacious deluxe room with mountain view.",
              amenities: ["AC", "Balcony", "TV", "Room Service"],
              images: ["/images/rooms/deluxe1.jpg"],
            },
            {
              roomType: "Family Suite",
              pricePerNight: 7500,
              totalRooms: 5,
              maxOccupancy: 4,
              description: "Perfect for families with extra space and comfort.",
              amenities: ["AC", "Living Area", "TV", "Mini Fridge"],
              images: ["/images/rooms/family1.jpg"],
            },
          ],
          rating: 4.5,
        },
        {
          agent: agent._id,
          name: `City Comfort Stay ${index + 1}`,
          address: "Central City Road",
          city: "Kochi",
          category: "Apartment",
          description:
            "Modern city stay ideal for travelers who love convenience and accessibility.",
          amenities: ["Free WiFi", "Lift", "24x7 Support"],
          images: [
            { url: "/images/hotels/city1.jpg", isThumbnail: true },
          ],
          locationMap: {
            latitude: 9.9312,
            longitude: 76.2673,
            address: "Kochi, Kerala, India",
          },
          rooms: [
            {
              roomType: "Standard Room",
              pricePerNight: 3000,
              totalRooms: 8,
              maxOccupancy: 2,
              description: "Comfortable room for short city stays.",
              amenities: ["AC", "TV", "WiFi"],
              images: ["/images/rooms/standard1.jpg"],
            },
          ],
          rating: 4.0,
        }
      );
    });

    await Hotel.insertMany(hotels);
    console.log("🏨 Hotels seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding hotels", error);
    throw error;
  }
};

export default seedHotels;
