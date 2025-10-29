import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import DistrictData from "./models/DistrictData.js";
import cors from "cors";

import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
 
// Basic route
 
app.get("/api/records", async (req, res) => {
  let {
    page,
    pageSize,
    state_name = "",
    district_name = "",
    fin_year = "",
    month = "",
  } = req.query;
 
  try {
    // If "page" and "pageSize" are not sent we will default them to 1 and 50.
    if (typeof state_name !== "string" || typeof district_name !== "string") {
      throw new Error(
        "Invalid input: state_name and district_name must be strings"
      );
    }
 
    if (typeof fin_year !== "string" || typeof month !== "string") {
      throw new Error("Invalid input: fin_year and month must be strings");
    }
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 50;
    state_name = state_name ? state_name.toUpperCase() : "";
    district_name = district_name ? district_name.toUpperCase() : "";
 
    const records = await DistrictData.aggregate([
      {
        $match: {
          state_name: state_name ? state_name : { $exists: true },
          district_name: district_name ? district_name : { $exists: true },
          fin_year: fin_year ? fin_year : { $exists: true },
          month: month ? month : { $exists: true },
        },
      },
 
      {
        $sort: {
          fin_year: 1,
        },
      },
 
      {
        $group: {
          _id: {
            state_name: "$state_name",
            district_name: "$district_name",
            month: "$month",
            fin_year: "$fin_year",
          },
          record: { $first: "$$ROOT" },
        },
      },
 
      {
        $replaceRoot: { newRoot: "$record" },
      },
 
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);
 
    return res.status(200).json({
      success: true,
      total: records[0].metadata[0].totalCount,
      
      records: {
       
        data: records[0].data,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false });
  }
});
 
app.get("/api/record/:id", async (req, res) => {
  try {
    const { id } = req.params; // extract id from the URL
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid record ID format" });
    }
 
    const record = await DistrictData.findById(id);
    return res.status(200).json({
      success: true,
      record: record,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
 
// Connect DB and start server
const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
};
 
startServer();