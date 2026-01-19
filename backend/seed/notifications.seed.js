// seeds/notifications.seed.js
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import Package from "../models/packageModel.js";
import Booking from "../models/bookingModel.js";

const seedNotifications = async () => {
  try {
    console.log("Seeding notifications...");

    await Notification.deleteMany();
    console.log("Old notifications cleared");

    // Fetch User references to assign recipients
    const admin = await User.findOne({ role: "admin" });
    const agent = await User.findOne({ role: "agent" });

    if (!admin || !agent) {
      console.error("❌ Seeding failed: Ensure users.seed.js is run first to create Admin and Agent users.");
      return;
    }

    // Fetch references for links
    const packages = await Package.find();
    const bookings = await Booking.find();

    const notifications = [
      // ADMIN RESPONSIBILITIES: Approvals and System Alerts
      {
        recipient: admin._id,
        type: "approval_required",
        priority: "high",
        title: "Package Approval Required",
        message: "A new travel package 'Alpine Escape' has been submitted and requires admin approval.",
        link: packages.length ? `/admin/packages/${packages[0]._id}` : "/admin/packages",
        isRead: false
      },
      {
        recipient: admin._id,
        type: "approval_required",
        priority: "medium",
        title: "Agent Verification Needed",
        message: "New agent 'GlobeTrotter Ltd' has uploaded their license for review.",
        link: "/admin/users",
        isRead: false
      },
      {
        recipient: admin._id,
        type: "system_alert",
        priority: "low",
        title: "System Maintenance",
        message: "Scheduled system maintenance will occur tonight at 11:00 PM.",
        link: "/admin/profile",
        isRead: true
      },

      // AGENT RESPONSIBILITIES: Bookings and Status Updates
      {
        recipient: agent._id,
        type: "new_submission",
        priority: "high",
        title: "New Booking Received",
        message: "Sophia Clark has booked your 'Paris Nights' package for July 20.",
        link: bookings.length ? `/agent/bookings/${bookings[0]._id}` : "/agent/bookings",
        isRead: false
      },
      {
        recipient: agent._id,
        type: "status_update",
        priority: "medium",
        title: "Package Approved",
        message: "Your 'Coastal Retreat' package has been approved by Admin and is now live.",
        link: "/agent/packages",
        isRead: false
      },
      {
        recipient: agent._id,
        type: "system_alert",
        priority: "low",
        title: "Payment Received",
        message: "Your commission for June has been processed and sent to your account.",
        link: "/agent/dashboard",
        isRead: false
      }
    ];

    await Notification.insertMany(notifications);
    console.log("👤 Notifications seeded successfully for Admin and Agent");
  } catch (error) {
    console.error("❌ Error seeding notifications:", error);
    throw error;
  }
};

export default seedNotifications;