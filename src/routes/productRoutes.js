import express from "express";
import {
  getAllProducts,
  getProductBySlug,
} from "../services/productService.js";

const router = express.Router();

/**
 * GET /api/products
 * Product catalog
 */
router.get("/products", async (req, res) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  /**
 * GET /api/products/:slug
 * Product detail
 */
router.get("/products/:slug", async (req, res) => {
    try {
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