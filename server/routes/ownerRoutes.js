import express from "express";
import { createRestaurant, getOwnersBookings, getRestaurant, UpdateRestaurant, UpdateStatus } from "../controllers/ownerController.js";
import upload from "../middleware/multerFile.js";

const router = express.Router();

router.get("/",getRestaurant);
router.post("/",upload.single("image"),createRestaurant);
router.patch("/status/:id",UpdateStatus);
router.put("/:id",upload.single("image"),UpdateRestaurant);
router.get("/bookings",getOwnersBookings);
export default router;
