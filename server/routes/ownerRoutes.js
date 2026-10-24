import express from "express";
import { checkOwner, createRestaurant, getOwnersBookings,UpdateRestaurant, UpdateStatus } from "../controllers/ownerController.js";
import upload from "../middleware/multerFile.js";

const router = express.Router();


router.post("/",upload.single("image"),createRestaurant);
router.patch("/status/:id",UpdateStatus);
router.put("/:id",upload.single("image"),UpdateRestaurant);
router.get("/bookings",getOwnersBookings);
router.get("/restaurant/:id",checkOwner);
export default router;
