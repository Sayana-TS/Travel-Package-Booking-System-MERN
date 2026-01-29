import express from "express";
import { makePayment } from "../controllers/paymentController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, makePayment);

export default router;
