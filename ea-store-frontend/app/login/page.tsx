"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"

export default function LoginPage() {

    const router = useRouter()
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {

      const token = localStorage.getItem("token")
    
      if (token) {
        router.push("/dashboard/orders")
      }
    
    }, [])
  
    async function handleLogin(e: any) {
  
      e.preventDefault()
  
      const res = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )
  
      const data = await res.json()
  
      if (res.ok) {
  
        localStorage.setItem("token", data.token)
  
        router.push("/dashboard/orders")
  
      } else {
  
        alert(data.error)
  
      }
  
    }
  
    return (
        <div>
            <Navbar></Navbar>
  
      <div className="flex items-center justify-center min-h-screen">
  
        <form
          onSubmit={handleLogin}
          className="w-96 border p-8 rounded-lg shadow">
  
          <h1 className="text-2xl font-bold mb-6">
            Login
          </h1>
  
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <button
            className="w-full bg-blue-600 text-white p-3 rounded">
            Login
          </button>
  
        </form>
  
      </div>
      </div>
    )
  }