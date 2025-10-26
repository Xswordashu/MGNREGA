import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("MGNREGA backend running...");
});

// Connect DB and start server
const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
};

startServer();
