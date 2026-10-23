import mongoose from "mongoose";
import { string } from "zod";

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
  },
  username:{
    type:String,
    trim:true
  },phoneNo:{
     type:String,
     trim:true
  },email:{
    type:String,
    trim:true
  }
},
  {
    timestamps: true,
  }
);
BookingSchema.pre("save", function () {
  if (!this.bookingId) {
    this.bookingId = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
});
export const Booking = mongoose.model("Booking", BookingSchema);