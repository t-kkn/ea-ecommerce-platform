import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import licenseRoutes from "./routes/licenseRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", licenseRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get("/", (req, res) => {
  res.send("EA License API running...");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/db-test", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * from users limit 5");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});
