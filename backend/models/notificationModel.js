// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    // Links the notification to a specific Admin or Agent
    recipient: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    type: { 
      type: String, 
      enum: [
        "system_alert",      // General alerts (Admin/Agent)
        "approval_required", // Agent license/Package review (Admin)
        "new_submission",    // New Booking or Package Draft (Agent/Admin)
        "status_update"      // Package approved/rejected (Agent)
      ] 
    },
    priority: { 
      type: String, 
      enum: ["low", "medium", "high"], 
      default: "low" 
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String }, // URL to the specific booking/package
    isRead: { type: Boolean, default: false },
  }, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);