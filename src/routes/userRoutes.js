import express from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users/profile", authMiddleware, async (req, res) => {

    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { id: true, email: true, createdAt: true },
      });
  

      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ user });
  })

export default router;