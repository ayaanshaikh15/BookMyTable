import express from 'express';
import { createBookings, deleteBooking, getMyBookings } from '../controllers/bookingsController.js';

const router = express.Router();

router.post("/",createBookings);
router.get("/",getMyBookings);
router.delete("/:id",deleteBooking);

export default router;