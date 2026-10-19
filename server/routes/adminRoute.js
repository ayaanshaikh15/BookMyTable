import express from 'express'
import { getAllRestaurants, getStats, approveRestaurants } from '../controllers/adminController.js';
const router = express.Router();
router.get("/restaurants",getAllRestaurants);
router.get("/restaurants/stats",getStats);
router.post("/restaurants/:id/approve",approveRestaurants);
export default router;