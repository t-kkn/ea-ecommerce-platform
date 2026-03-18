import express from "express";
import { createOrder } from "../services/orderService.js";
import { getOrderHistory } from "../services/orderService.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

// Create a checkout order
router.post("/orders/checkout", authMiddleware, async (req, res) => {

  try {
    // Get user ID from authenticated token
    const userId = req.userId;
    const { productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        error: "productId required"
      });
    }

    // Create a new order in the database
    const order = await createOrder(userId, productId);

    res.json({
      message: "Order created",
      order
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }

});

// Get order history for a specific user
router.get("/orders/history/:userId", authMiddleware, async (req, res) => {

  try {

    // Always use the logged-in user's ID from the token
    const userId = req.userId;

    // Fetch order history from database/service
    const orders = await getOrderHistory(userId);

    res.json({
      orders
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch order history"
    });
  }

});

export default router;
