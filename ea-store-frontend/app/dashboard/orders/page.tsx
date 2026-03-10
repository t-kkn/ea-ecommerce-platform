"use client"

import { useEffect, useState } from "react"

export default function OrdersPage() {

    const [orders, setOrders] = useState<any[]>([])
    const userId = "99ed2055-4b55-479f-93bc-80e497333f71"  // demo-user-id
  
    useEffect(() => {
  
      async function fetchOrders() {
  
        const res = await fetch(
          `http://localhost:5001/api/orders/history/${userId}`
        )
  
        const data = await res.json()
  
        setOrders(data.orders)
      }
  
      fetchOrders()
  
    }, [])
  
    return (
  
      <div className="max-w-5xl mx-auto py-16">
  
        <h1 className="text-3xl font-bold mb-10">
          My Orders
        </h1>
  
        <table className="w-full border">
  
          <thead className="bg-gray-500">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
  
          <tbody>
  
            {orders.map((order) => (
  
              <tr key={order.id} className="border-t">
  
                <td className="p-3">
                  {order.product.name}
                </td>
  
                <td className="p-3">
                  ${order.amount}
                </td>
  
                <td className="p-3">
                <span
                className={`px-3 py-1 rounded text-white ${
                    order.status === "PAID"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                    }`}>
                        {order.status}
                        </span>
                </td>
  
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    )
  }