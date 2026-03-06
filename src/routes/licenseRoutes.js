import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

// Verify EA license from MT account
router.post("/verify-license", async (req, res) => {
  // Get license key and MT account from request body
  const { licenseKey, mtAccount } = req.body;

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