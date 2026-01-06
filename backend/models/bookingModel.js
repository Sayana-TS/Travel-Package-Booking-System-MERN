import mongoose from "mongoose";

const travelerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String },
  phone: { type: String }
});

const paymentSchema = new mongoose.Schema({
  method: { type: String, enum: ["credit_card", "debit_card", "paypal"], required: true },
  cardNumber: { type: String },
  expiry: { type: String },
  cvv: { type: String }
});

const priceSchema = new mongoose.Schema({
  packagePrice: { type: Number, required: true },
  taxesFees: { type: Number, default: 0 },
  total: { type: Number, required: true }
});

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    
    travelDates: {
      start: { type: Date, required: true },
      end: { type: Date, required: true }
    },

    numberOfTravelers: { type: Number, required: true },
    travelersDetails: [travelerSchema],
    specialRequests: { type: String },

    price: priceSchema,
    payment: paymentSchema,

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending"
    },

    bookingID: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
