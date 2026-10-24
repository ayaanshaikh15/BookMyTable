
import imagekit from "../config/Imagekit.js";
import { Booking } from "../models/Bookings.js";
import Restaurant from "../models/Restaurant.js";

const uploadToCloudinary = async(file) => {
   const result = await imagekit.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/bookmytable/restaurants",
    });

    return result;
};


export const createRestaurant = async (req, res) => {
  try {
    const existing = await Restaurant.findOne({ owner: req.user?.id });

    if (existing) {
      return res.status(404).json({ message: "Restaurant already exists" });
    }
    const {
      name,

      description,
      cuisine,
      priceRange,
      location,
      address,
      chef,
      tags,
      availableSlots,

      totalSeats,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !tags ||
      !description ||
      !cuisine ||
      !priceRange ||
      !location ||
      !address ||
      !chef
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    let imageUrl = "";


    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      imageUrl = result.url;
    }

    const parsedtags =
      typeof tags === "string"
        ? tags.split(",").map((s) => s.trim())
        : tags || [];
    const parsedslots =
      typeof availableSlots === "string"
        ? availableSlots.split(",").map((e) => e.trim())
        : availableSlots || ["17:00", "18:00", "19:00", "20:00", "21:00"];

    const restaurant = await Restaurant.create({
      name,
      description,
      cuisine,
      priceRange,
      location,
      address,
      chef,
      tags: parsedtags,
      availableSlots: parsedslots,
      image: imageUrl,
      totalSeats: totalSeats ? Number(totalSeats) : 20,
      status: "pending",
      // Take owner from logged-in user
      owner: req.user.id,
      slug,
      // Mongoose will set this to "pending"
      // because of the schema default
    });

    return res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
};

export const UpdateRestaurant = async (req, res) => {
  try {
    
    const restaurant = await Restaurant.findOne({ owner: req.user?.id });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found " });
    }
   
    const {
      name,

      description,
      cuisine,
      priceRange,
      location,
      address,
      chef,
      tags,
      availableSlots,

      totalSeats,
    } = req.body;

    if (name) restaurant.name = name;
    if (description) restaurant.description = description;
    if (cuisine) restaurant.cuisine = cuisine;
    if (priceRange) restaurant.priceRange = priceRange;
    if (location) restaurant.location = location;
    if (address) restaurant.address = address;
    if (chef) restaurant.chef = chef;
    if (tags)
      restaurant.tags =
        typeof tags === "string" ? tags.split(",").map((s) => s.trim()) : tags;
    if (availableSlots)
      restaurant.availableSlots =
        typeof availableSlots === "string"
          ? availableSlots.split(",").map((e) => e.trim())
          : availableSlots;
    if (totalSeats) restaurant.totalSeats = totalSeats;
    // handle image update


      if (req.file) {
      const result = await uploadToCloudinary(req.file);
    restaurant.image = result.url;
    }
    
    const update = await restaurant.save();
    res
      .status(200)
      .json({ message: "Restaurant updated successfully", data: update });
  } catch (e) {
    console.error("Error : ", e.message);
    res.status(500).json({ message: e.message });
  }
};
export const UpdateStatus = async (req, res) => {
  try {
     const {status}=req.body;
    if(!status || !['completed',"confirmed","cancelled"].includes(status)){
      return res.status(400).json({message:"please enter valid status"});
    }
    const bookings = await Booking.findById(req.params.id);
    if(!bookings){
      return res.status(404).json({message:"Bookings not found"});
    }
   const restaurant = await Restaurant.findById(bookings.restaurantId);
   if(!restaurant || !restaurant.owner.toString()===req.user.id.toString()){
    return res.status(400).json({message:"Not authorised to change the status"});
   }

    bookings.status=status;
    const updatedstatus = await bookings.save();
    res.json({message:"Status updated successfully",data:updatedstatus})
     
  } catch (e) {
    console.error("Error : ", e.message);
    res.status(500).json({ message: e.message });
  }
};

export const getOwnersBookings = async (req, res) => {
  try {
const restaurant = await Restaurant.findOne({ owner: req.user?.id });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found " });
    }
   const bookings = await Booking.find({ restaurantId: restaurant._id })
  .populate("userId", "name email phone")
  .sort({ date: -1, time: -1 });
    res.json(bookings)
  } catch (e) {
    console.error("Error : ", e.message);
    res.status(500).json({ message: e.message });
  }
};
export const checkOwner =async(req,res)=>{
    try{
      const {id}= req.params
        const restaurant = await Restaurant.findOne({ owner: id });

    if (!restaurant) {
      return res.status(200).json({
  success: true,
  hasRestaurant: false,
  restaurant: null,
});
    }
   return res.status(200).json({
  success: true,
  hasRestaurant: true,
  restaurant,
});;
    }catch(e){
    console.error("Error : ", e.message);
    res.status(500).json({ message: e.message });
    }
}