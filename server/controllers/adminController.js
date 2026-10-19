import { Booking } from "../models/Bookings.js";
import Restaurant from "../models/Restaurant.js";
import { User } from "../models/User.js";
const getAllRestaurants=async (req,res)=>{
    try{
           const restaurants = await Restaurant.find({}).populate("owner","name email").sort({createdAt:-1});


           if(!restaurants || restaurants.length === 0) {

            return res.status(404).json({message:"No restaurants found"})

           }
           res.status(200).json({restaurants})
    }catch(e){
        console.error(e)
        res.status(500).json({message: e.message})
    
    }
}


const approveRestaurants=async (req,res)=>{
    try{
           const {id}=req.params;
           const{status}=req.body;
            if(!status || !["pending", "approved", "rejected"].includes(status)){
      return res.status(400).json({message:"please enter valid status"});
    }
           const restaurant = await Restaurant.findById(id);
           if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"})
           }
           restaurant.status = status;
           await restaurant.save();
           res.status(200).json({message:"Restaurant status updated successfully"})
    }catch(e){
        console.error(e)
        res.status(500).json({message: e.message})
    
    }
}

const getStats=async (req,res)=>{
    try{
           const totalRestaurants = await Restaurant.countDocuments();
           const totalOwners = await User.countDocuments({role:"owner"});
           const totalcustomers = await User.countDocuments({role:"customer"});
           const totalBookings = await Booking.countDocuments()
           const latestBookings = await Booking.countDocuments()
           .populate("user","name email")
           .populate("restaurant","name location address")
           .sort({createdAt:-1}).limit(10);
           const totalusers = totalOwners + totalcustomers;

           res.status(200).json({
            users:{
                total:totalusers,
                owners:totalOwners,
                customers:totalcustomers
            },
            restaurants:{
                  total:totalRestaurants
                },
            bookings:{
                total:totalBookings,
                latest:latestBookings
    }});


    }catch(e){
        console.error(e)
        res.status(500).json({message: e.message})
    
    }
}
export {getAllRestaurants,approveRestaurants,getStats};