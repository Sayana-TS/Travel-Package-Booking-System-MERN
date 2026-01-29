import express from "express";
import { protect, authorize } from "../middlewares/authMiddlewares.js";
import { 
  createTicket, 
  addMessage, 
  getMyTickets, 
  assignTicket 
} from "../controllers/ticketController.js";

const router = express.Router();

router.use(protect); // All ticket routes require login

router.route("/")
  .post(createTicket)
  .get(getMyTickets);

router.post("/:id/message", addMessage);

// Admin Only
router.patch("/:id/assign", authorize("admin"), assignTicket);

export default router;