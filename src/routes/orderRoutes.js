import express from "express";
import { createOrder } from "../services/orderService.js";
import { getOrderHistory } from "../services/orderService.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

// Create order (checkout)
router.post("/orders/checkout", async (req, res) => {
  try {

    // Get userId and productId from request body
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        error: "userId and productId required"
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

    // Extract userId from URL parameters
    const { userId } = req.params;

    // Fetch order history from the database
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