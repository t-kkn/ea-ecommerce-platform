import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import licenseRoutes from "./routes/licenseRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Register API route groups
app.use("/api", licenseRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", authRoutes)
app.use("/api", userRoutes);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

// Root route to confirm API is running
app.get("/", (req, res) => {
  res.send("EA License API running...");
});

// Set server port from environment or default
const PORT = process.env.PORT || 5001;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test database connection
app.get("/db-test", async (_req, res) => {

  try {
    const result = await pool.query("SELECT * from users limit 5"); // Query sample users
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
  
});
