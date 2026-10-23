 import { Booking } from "../models/Bookings.js";
import Restaurant from "../models/Restaurant.js";
export const getAllRestaurants = async (req,res)=>{
  try{
      const {search,location,sortBy,rating,priceRange} = req.query;
      const queryObj = {status:"approved"};

       if(search){
          queryObj.$or=[
            {name:{$regex : search , $options:"i"}},
            {tags:{$regex : search , $options:"i"}},
            {location:{$regex : search , $options:"i"}}
          ]

       }
       if(priceRange){
             const price = Array.isArray(priceRange) ? priceRange : [priceRange];
                queryObj.priceRange = {$in:price}

       }

       if(rating){
         queryObj.rating = {$gte:parseFloat(rating)}
       }
        if(location){
            queryObj.location = {$regex : location , $options:"i"}
        }
       const sort = {createdAt:-1};
       if(sortBy){
          if(sortBy === "rating"){
            sort.rating = -1;
          }else if(sortBy === "price_low"){
            sort.priceRange = 1;
          }else if(sortBy === "price_high"){
            sort.priceRange = -1;
          }
       }
      const restaurant = await Restaurant.find(queryObj).sort(sort);
      res.status(200).json(restaurant
      )
  }catch(e){
    console.error("Error fetching all restaurants:", e);
    res.status(400).json({
          message:e.message 
  }  )
}
}

export const getFeaturedRestaurants = async (req,res)=>{
     try{
       const featured = await Restaurant.find({status:"approved",$or:[{featured:true},{exclusive:true}]}).limit(6);
       res.status(200).json(featured);
  }catch(e){
    console.error("Error fetching Featured restaurants:", e.message);
    res.status(500).json({
          message:e.message 
  }  )
}
}
export const getRestaurantsBySlug = async (req,res)=>{
     try{
     const {slug} = req.params;
     const restaurant = await Restaurant.findOne({slug});
     if(!restaurant){
        return res.status(404).json({
          message:"Restaurant not found"
        })
     }
     if(restaurant.status !== "approved"){
       let isAuthorized = false;
        if(req.user && (req.user.role ==="admin" || (req.user.role==="owner" && req.user.id.toString() === restaurant.owner.toString()) )){
            isAuthorized=true;
        }
        if(!isAuthorized){
            return res.status(400).json({message:"Not Authorized"})
        }
     }
        res.status(200).json(restaurant);
  }catch(e){
    console.error("Error fetching restaurants by slug:", e.message);
    res.status(500).json({
          message:e.message 
  }  )
}
}
export const getRestaurantsAvailablity = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const bookingDate = new Date(date);

    const bookings = await Booking.find({
      restaurantId: restaurant._id,
      date: bookingDate,
      status: "confirmed",
    });

    const availability = restaurant.availableSlots.map((slot) => {
      const bookedSeats = bookings
        .filter((b) => b.time === slot)
        .reduce((sum, b) => sum + b.guests, 0);

      const totalSeats = restaurant.totalSeats || 20;

      const availableSeats = Math.max(
        0,
        totalSeats - bookedSeats
      );

      return {
        time: slot,
        availableSeats,
        isAvailable: availableSeats > 0,
      };
    });

    res.status(200).json(availability);

  } catch (e) {
    console.error(
      "Error fetching restaurant availability:",
      e.message
    );

    res.status(500).json({
      message: e.message,
    });
  }
};

export const getRestaurantsById = async (req,res)=>{
  try{
    const {id} = req.params;
    const restaurant = await Restaurant.findById(id);
    if(!restaurant){
      return res.status(404).json({
        message:"Restaurant not found"
      })
    }
    if(restaurant.status !== "approved"){
      res.status(400).json({"message":"restaurant is not approved"})
    }

    res.status(200).json(restaurant);
  }catch(e){
    console.error(
      "Error fetching restaurant by id : ",
      e.message
    );

    res.status(500).json({
      message: e.message,
    });
  }
}