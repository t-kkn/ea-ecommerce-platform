import express from "express";
import { createOrder } from "../services/orderService.js";
import { getOrderHistory } from "../services/orderService.js";

const router = express.Router();

/**
 * POST /api/orders/checkout
 */
router.post("/orders/checkout", async (req, res) => {
  try {

    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        error: "userId and productId required"
      });
    }

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

/**
 * GET /api/orders/history/:userId
 */
router.get("/orders/history/:userId", async (req, res) => {

  try {

    const { userId } = req.params;

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