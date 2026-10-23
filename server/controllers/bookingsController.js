import { Booking } from "../models/Bookings.js";
import Restaurant from "../models/Restaurant.js";
import {User} from '../models/User.js';
export const createBookings = async (req, res) => {
  try {
    const { restaurantId, date, time, occasion, specialRequests, guests,phoneNo } =
      req.body;

    if (!restaurantId || !date || !time || !guests) {
      res.status(400).json({ message: "Provide all the required fields" });
      return;
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(400).json({ message: "Restaurant not found" });
      return;
    }

    if (restaurant.status !== "approved") {
      res
        .status(400)
        .json({ message: "restaurant is not approved by the admin" });
      return;
    }

    const existingBookings = await Booking.find({
      restaurantId,
      time,
      date: new Date(date),
      status: "confirmed",
    });

    const requestedSeats = Number(guests);
    const bookingSeats = existingBookings.reduce((sum, b) => sum + b.guests, 0);
   
    const totalseats = restaurant.totalSeats || 20;

    const availableSeats = totalseats - bookingSeats;

    if (availableSeats < requestedSeats) {
      res
        .status(400)
        .json({
          message: `Unable to reserve.Only ${availableSeats} this many seats are available for this time slot `,
        });
      return;
    }
    const user = await User.findById(req.user.id);

    const booking = await Booking.create({
      restaurantId,
      userId: req.user.id,
      date: new Date(date),
      time,
      occasion,
      specialRequests,
      guests,
      status: "confirmed",
      username:user.name,
      phoneNo,
      email:user.email
    });

    const populatedBookings = await booking.populate(
      "restaurantId",
      "name image location address",
    );
    //send response
    res.status(200).json(populatedBookings);
  } catch (e) {
    console.error("Error : ", e.message);
    res.status(500).json({ message: e.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const booking = await Booking.find({ userId: req.user.id })
      .populate("restaurantId", "name image location slug address")
      .sort({ date: -1, time: -1 });

    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json(booking);
  } catch (e) {
    console.error("Error : ", e.message);
    res.status(500).json({ message: e.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      res.status(400).json({ message: "Booking not found" });
      return;
    }

    if (booking.userId.toString() !== req.user.id.toString()) {
      res.status(400).json({ message: "Not authorized to delete the booking" });
      return;
    }

    booking.status = "cancelled";

    await booking.save();
    const populatedBookings = await booking.populate(
      "restaurantId",
      "name image location address",
    );
    //send response

    res
      .status(200)
      .json({
        message: "Booking cancelled successfully",
        booking: populatedBookings,
      });
  } catch (e) {
    console.error("Error : ", e.message);
    res.status(500).json({ message: e.message });
  }
};
