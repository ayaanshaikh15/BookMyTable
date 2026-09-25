import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import dns from "dns";
import { User } from "./models/User.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/userAuth.js";

dotenv.config();

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
// Test route
app.get("/", async(req, res) => {
  const user = await User.find();
  

  res.json(user);
});
app.use((Error,req,res)=>{
  console.error("Unhandled Error: ",Error);
  res.status(500).json({
    message:"Internal Server Error",
    stack: NODE_ENV === "production"?undefined : Error.stack
  })
})
const PORT = process.env.PORT || 5000;
await connectDB();
app.listen(PORT, () => {
  
  console.log(`Server running on http://localhost:${PORT}`);
});