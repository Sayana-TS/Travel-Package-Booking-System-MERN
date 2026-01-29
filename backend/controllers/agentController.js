import Agent from "../models/agentModel.js";

export const createAgentProfile = async (req, res) => {
  try {
    // Prevent duplicate agent profiles
    const existing = await Agent.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "Agent profile already exists" });
    }

    const agent = await Agent.create({
      user: req.user._id,
      businessName: req.body.businessName,
      about: req.body.about,
      location: req.body.location,
      expertise: req.body.expertise,
      operatingRegion: req.body.operatingRegion,
      socialLinks: req.body.socialLinks,
      verification: {
        licenseNumber: req.body.licenseNumber,
        licenseImage: req.body.licenseImage,
        status: "pending"
      }
    });

    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getMyAgentProfile = async (req, res) => {
    try {
      const agent = await Agent.findOne({ user: req.user._id });
  
      if (!agent) {
        return res.status(404).json({ message: "Agent profile not found" });
      }
  
      res.json(agent);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
  export const verifyAgent = async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id);
  
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      agent.verification.status = "active";
      agent.verification.isVerified = true;
      agent.verification.verifiedAt = new Date();
  
      await agent.save();
  
      res.json(agent);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  export const getAgentPublicProfile = async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id)
        .populate("user", "name profileImage");
  
      if (!agent || agent.verification.status !== "active") {
        return res.status(404).json({ message: "Agent not available" });
      }
  
      res.json(agent);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


