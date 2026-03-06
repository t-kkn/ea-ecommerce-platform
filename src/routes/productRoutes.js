import express from "express";
import {
  getAllProducts,
  getProductBySlug,
} from "../services/productService.js";

const router = express.Router();

// API endpoint to get all products
router.get("/products", async (req, res) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get product details by slug
  router.get("/products/:slug", async (req, res) => {
    try {
      // Fetch product from database using slug parameter
      const product = await getProductBySlug(req.params.slug);
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  export default router;