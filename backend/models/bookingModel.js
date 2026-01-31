// models/Booking.js
import mongoose from "mongoose";

// --- Sub-Schemas from User Flow ---
const travelerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String },
  phone: { type: String }
});

const paymentSchema = new mongoose.Schema({
  method: { type: String, enum: ["credit_card", "debit_card", "paypal"], required: true },
  cardNumber: { type: String }, // In production, usually just stored as last4 digits
  expiry: { type: String },
  cvv: { type: String },
  status: { type: String, default: "pending" }, // Added to track Agent Flow Step 11
  transactionId: { type: String }
});

const priceSchema = new mongoose.Schema({
  packagePrice: { type: Number, required: true },
  taxesFees: { type: Number, default: 0 },
  total: { type: Number, required: true }
});

// --- Main Booking Schema ---
const bookingSchema = new mongoose.Schema(
  {
    bookingID: {
      type: String,
      unique: true,
      required: true
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    package: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Package", 
      required: true 
    },
    // Merged: Link to the Agent for their Dashboard Stats (Revenue/Bookings)
    agent: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Agent", 
      required: true 
    },
    
    travelDates: {
      start: { type: Date, required: true },
      end: { type: Date, required: true }
    },

    numberOfTravelers: { type: Number, required: true },
    travelersDetails: [travelerSchema],
    
    // Step 11: Agent Flow needs customer notes
    specialRequests: { type: String },
    customerNotes: { type: String }, 

    price: priceSchema,
    payment: paymentSchema,

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending"
    },
    
    // Step 11: Detailed timeline for the Booking Details Page
    timeline: [
      {
        event: String, // "Booking Created", "Payment Received", etc.
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Add pre-save middleware for auto-generating bookingID
bookingSchema.pre('save', async function(next) {
  if (!this.bookingID) {
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingID = `BK${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model("Booking", bookingSchema);