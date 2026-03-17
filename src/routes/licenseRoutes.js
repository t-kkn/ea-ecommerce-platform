import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

// Endpoint to verify a license key
router.post("/verify-license", async (req, res) => {
  
  const { licenseKey, mtAccount } = req.body;

  // Find license in database by licenseKey
  const license = await prisma.license.findUnique({
    where: { licenseKey },
  });

  if (!license) {
    return res.json({ status: "INVALID" });
  }

  if (license.status !== "ACTIVE") {
    return res.json({ status: "INACTIVE" });
  }

  if (new Date() > license.expiryDate) {
    return res.json({ status: "EXPIRED" });
  }

  res.json({ status: "VALID", expiryDate: license.expiryDate });
});

export default router;
