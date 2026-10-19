import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import dns from "dns";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/userAuth.js";
import restaurantRoutes from "./routes/restaurantRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
import bookingsRoutes from "./routes/bookingRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import adminRouter from './routes/adminRoute.js';
import ownerMiddleware from "./middleware/ownerMiddleware.js";
import adminMiddleware from "./middleware/adminMiddleware.js";
import limiter from "./Limiter/RateLimiter.js";

dotenv.config();
//6ac9b10742370b94f2d082a8
dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use("/api/auth",authRoutes);
app.use("/api/restaurants",authMiddleware,restaurantRoutes);
app.use("/api/bookings",authMiddleware,bookingsRoutes);
app.use("/api/owner",authMiddleware,ownerMiddleware,ownerRouter);
app.use("/api/admin",authMiddleware,adminMiddleware,adminRouter);
// Test route

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);

  res.status(500).json({
    message: "Internal Server Error",
    stack: NODE_ENV === "production" ? undefined : err.stack,
  });
});


const PORT = process.env.PORT || 5000;
await connectDB();
app.listen(PORT, () => {
  
  console.log(`Server running on http://localhost:${PORT}`);
});