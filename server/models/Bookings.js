import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
   restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookingId:{
        type:String,
        unique:true,
    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    guests:{
        type:Number,
        required:true,
        min:1
    },
    occasion:{
        type:String,
        trim:true

  },
  specialRequests:{
        type:String,
        trim:true

  },
  status:{
    type:String,
    enum:["completed","confirmed","cancelled"],
    default:"confirmed"
  }
},
  {
    timestamps: true,
  }
);
BookingSchema.set("save",()=>{
  if(!this.bookingId){
    this.bookingId = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
})
export const Booking = mongoose.model("Booking", BookingSchema);