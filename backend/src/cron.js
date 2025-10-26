import cron from "node-cron";
import { fetchAndStoreData } from "./mgnregaSync.js";

// Schedule daily at 22:01 (10:01 PM)
cron.schedule("1 22 * * *", async () => {
  console.log("🕑 Cron triggered: Starting MGNREGA sync...");
  try {
    await fetchAndStoreData();
  } catch (err) {
    console.error("❌ Cron sync failed:", err);
  }
});

console.log("✅ Cron job scheduled: MGNREGA sync will run daily at 22:01");

// Optional: run immediately for testing
// fetchAndStoreData().catch(err => console.error("❌ Manual sync failed:", err));
