import express from 'express'
import { getAllRestaurants, getFeaturedRestaurants, getRestaurantsBySlug, getRestaurantsAvailablity,getRestaurantsById } from '../controllers/restaurantController.js';
const router = express.Router();
router.get('/', getAllRestaurants);
router.get('/featured',getFeaturedRestaurants);
router.get('/:slug', getRestaurantsBySlug);
router.get('/:id/availability', getRestaurantsAvailablity);
router.get('/:id/restaurant',getRestaurantsById);
export default router;