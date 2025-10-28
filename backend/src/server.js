import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import DistrictData from "./models/DistrictData.js";
dotenv.config();
const app = express();

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("MGNREGA backend running...");
});

app.get("/api/records", async (req, res) => {
     let { page, pageSize, state_name, district_name } = req.query;

  try {
    // If "page" and "pageSize" are not sent we will default them to 1 and 50.
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 50;
    state_name  = state_name ? state_name.toUpperCase() : "";
    district_name  = district_name ? district_name.toUpperCase() : "";
    const records = await DistrictData.aggregate([
      {
        $match: {
          state_name: state_name ? state_name : { $exists: true },
          district_name: district_name ? district_name : { $exists: true },
      
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      records: {
        metadata: { totalCount: records[0].metadata[0].totalCount, page, pageSize },
        data: records[0].data,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});


// Connect DB and start server
const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
};

startServer();
