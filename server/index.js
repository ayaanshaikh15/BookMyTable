import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import dns from "dns";


dotenv.config();

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "TableBook API is running",
  });
});

const PORT = process.env.PORT || 5000;
await connectDB();
app.listen(PORT, () => {
  
  console.log(`Server running on http://localhost:${PORT}`);
});