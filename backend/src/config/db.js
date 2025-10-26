import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop script if connection fails
  }
};
