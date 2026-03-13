"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { apiFetch } from "../lib/api"

// Create a new order for a selected product
async function createOrder(productId: string) {

  // Get JWT token from browser storage
  const token = localStorage.getItem("token");
  
  const response = await apiFetch("http://localhost:5001/api/orders/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Send JWT for authentication
    },
    body: JSON.stringify({ productId }), // Send product ID in request body
    });
  
    const data = await response.json()
    alert("Order created: " + data.order.id)
  }

export default function CheckoutPage() {

  // Get URL query parameters  
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")
  
  // Store product data in state
  const [product, setProduct] = useState<any>(null)
  
    useEffect(() => {
  
      // Fetch product data from the API
      async function fetchProduct() {
  
        const res = await apiFetch(
          `http://localhost:5001/api/products`
        )
  
        const products = await res.json()
  
        // Find the product that matches the productId from the URL
        const selectedProduct = products.find(
          (p: any) => p.id === productId
        )
  
        // Save the selected product to state
        setProduct(selectedProduct)
      }
  
      // Run the fetch function
      fetchProduct()
  
      // Re-run effect if productId changes
    }, [productId])
  
    if (!product) {
      return <p>Loading...</p>
    }
  
    return (
      <div>
        <Navbar></Navbar>
  
      <div className="max-w-4xl mx-auto py-20">
  
        <h1 className="text-3xl font-bold mb-10">
          Checkout
        </h1>
  
        <div className="border p-6 rounded-lg">
  
          <h2 className="text-xl font-semibold">
            {product.name}
          </h2>
  
          <p className="text-gray-500 mt-2">
            {product.description}
          </p>
  
          <p className="text-2xl font-bold mt-4">
            ${product.price}
          </p>
  
          <button
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
            onClick={() => createOrder(product.id)}
          >
            Confirm Order
          </button>
  
        </div>
  
      </div>
      </div>
    )
  }