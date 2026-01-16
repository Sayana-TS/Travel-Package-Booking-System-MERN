// models/User.js - Shared Auth for Travelers & Agents
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: function() { return this.authProvider === "local"; } },
  authProvider: { type: String, enum: ["local", "google", "facebook"], default: "local" },
  role: { type: String, enum: ["user", "agent", "admin"], default: "user" },
  profileImage: { type: String, default: "" },
  phone: { type: String, default: "" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }],
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

export default mongoose.model("User", userSchema);