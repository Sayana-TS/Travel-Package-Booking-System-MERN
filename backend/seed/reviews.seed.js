// seeds/reviews.seed.js

import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";
import Agent from "../models/agentModel.js";
import Package from "../models/packageModel.js";

const seedReviews = async () => {
  console.log("Seeding reviews...");

  const users = await User.find();
  const agents = await Agent.find();
  const packages = await Package.find();

  if (!users.length || !agents.length || !packages.length) {
    throw new Error("Users / Agents / Packages missing. Seed them first.");
  }

  await Review.deleteMany();
  console.log("Old reviews cleared");

  const reviews = [
    // --- Package Review ---
    {
      reviewer: users[0]._id,
      reviewee: packages[0]._id,
      onModel: "Package",
      rating: 5,
      comment: "Absolutely loved this trip! Everything was perfectly planned.",
      images: [
        "https://example.com/reviews/package1/img1.jpg",
        "https://example.com/reviews/package1/img2.jpg"
      ],
      likes: [users[1]?._id].filter(Boolean),
      dislikes: []
    },

    // --- Agent Review ---
    {
      reviewer: users[0]._id,
      reviewee: agents[0]._id,
      onModel: "Agent",
      rating: 4,
      comment: "Very professional agent. Communication was smooth and helpful.",
      images: [
        "https://example.com/reviews/agent1/img1.jpg"
      ],
      likes: [],
      dislikes: []
    }
  ];

  await Review.insertMany(reviews);
  console.log("Reviews seeded successfully");
};

export default seedReviews;
