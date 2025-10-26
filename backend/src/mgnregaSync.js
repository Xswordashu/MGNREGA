// src/mgnregaSync.js
import axios from "axios";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

// Sleep helper
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fetch with retry logic
const fetchWithRetry = async (url, params = {}, retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(url, { params, timeout: 10000 }); // 10s timeout
      return res.data;
    } catch (err) {
      console.warn(`⚠️ Attempt ${i + 1} failed: ${err.message}`);
      if (i < retries - 1) await sleep(delay);
      else throw new Error("❌ Failed to fetch after all retries");
    }
  }
};

export const fetchAndStoreData = async () => {
  // Connect to MongoDB
  await connectDB(); // no need to return db, use mongoose.connection

  const activeCollectionName = "district_data_v1";
  const inactiveCollectionName = "district_data_v2";

  const inactiveCollection = mongoose.connection.collection(inactiveCollectionName);

  console.log("🚀 Starting MGNREGA data sync...");

  const baseUrl = "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
  const limit = 1000; // records per page
  const chunkSize = 500; // MongoDB insert chunk

  // Clean inactive collection
  await inactiveCollection.deleteMany({});
  console.log("🧹 Inactive collection cleaned");

  let page = 1;
  let totalInserted = 0;

  while (true) {
    console.log(`📥 Fetching page ${page}...`);

    const params = {
      limit,
      offset: (page - 1) * limit,
      format: "json",
      "api-key": process.env.MGNREGA_API_KEY,
    };

    const response = await fetchWithRetry(baseUrl, params);

    const records = response?.records || response?.data || response;
    if (!Array.isArray(records) || records.length === 0) {
      console.log("✅ No more records to fetch, stopping.");
      break;
    }

    // Insert in chunks
    for (let i = 0; i < records.length; i += chunkSize) {
      const chunk = records.slice(i, i + chunkSize);
      await inactiveCollection.insertMany(chunk);
      totalInserted += chunk.length;
      console.log(`📦 Inserted ${chunk.length} records (total: ${totalInserted})`);
    }

    if (records.length < limit) break;

    page++;
    await sleep(500); // optional delay to avoid API rate limits
  }

  console.log(`🧮 Total records inserted: ${totalInserted}`);

  // Verify integrity
  const count = await inactiveCollection.countDocuments();
  if (count !== totalInserted) {
    throw new Error(`❌ Count mismatch: expected ${totalInserted}, found ${count}`);
  }
  console.log("✅ Data integrity verified");

  // Swap collections atomically
  // Swap collections atomically
try {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const oldExists = collections.some((c) => c.name === "district_data_old");
  if (oldExists) await mongoose.connection.collection("district_data_old").drop();

  const activeExists = collections.some((c) => c.name === activeCollectionName);

  if (activeExists) {
    // Rename active to old
    await mongoose.connection.collection(activeCollectionName).rename("district_data_old");
    console.log("🔁 Active collection renamed to old");
  } else {
    console.log("ℹ️ Active collection does not exist, skipping rename to old");
  }

  // Rename inactive to active
  await mongoose.connection.collection(inactiveCollectionName).rename(activeCollectionName);
  console.log("🔁 Inactive collection renamed to active successfully");

} catch (err) {
  console.error("❌ Swap failed:", err);
  throw err;
}



  console.log("🎉 MGNREGA data sync completed successfully!");
};
