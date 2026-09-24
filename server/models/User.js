import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["customer", "owner", "admin"],
      default: "customer",
    },

    // Used for password reset
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.set("toJSON",{
    transform:(doc,ret)=>{
       delete ret.password;
       return ret;
    }
})
export const User = mongoose.model("User", userSchema);