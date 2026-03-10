"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

async function createOrder(productId: string) {

    const response = await fetch(
      "http://localhost:5001/api/orders/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: "demo-user-id",
          productId: productId
        })
      }
    )
  
    const data = await response.json()
  
    alert("Order created: " + data.order.id)
  }

export default function CheckoutPage() {

    const searchParams = useSearchParams()
    const productId = searchParams.get("productId")
  
    const [product, setProduct] = useState<any>(null)
  
    useEffect(() => {
  
      async function fetchProduct() {
  
        const res = await fetch(
          `http://localhost:5001/api/products`
        )
  
        const products = await res.json()
  
        const selectedProduct = products.find(
          (p: any) => p.id === productId
        )
  
        setProduct(selectedProduct)
      }
  
      fetchProduct()
  
    }, [productId])
  
    if (!product) {
      return <p>Loading...</p>
    }
  
    return (
  
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
    )
  }