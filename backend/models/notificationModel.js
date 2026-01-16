// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type: { type: String, enum: ["system_alert", "approval_required", "new_submission"] },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    title: String,
    message: String,
    link: String, // URL to the specific booking/package
    isRead: { type: Boolean, default: false },
  }, { timestamps: true });

  export default mongoose.model("Notification", notificationSchema);