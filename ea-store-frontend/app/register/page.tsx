"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"

export default function RegisterPage() {

    const router = useRouter()
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    async function handleRegister(e: any) {
  
      // Prevent page reload when form is submitted
      e.preventDefault()
  
      // Send POST request to the register API
      const res = await fetch(
        "http://localhost:5001/api/auth/register",
        {
          method: "POST", // HTTP method
          headers: {
            "Content-Type": "application/json" // Tell server we send JSON
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )
  
      const data = await res.json()
  
      if (res.ok) {
        alert("Registration successful!")
        router.push("/login")
      } else {
        alert(data.error)
      }
  
    }
  
    return (
        <div>
            <Navbar></Navbar>
  
      <div className="flex items-center justify-center min-h-screen">
  
        <form
          onSubmit={handleRegister}
          className="w-96 border p-8 rounded-lg shadow">
  
          <h1 className="text-2xl font-bold mb-6">
            Register
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
            Register
          </button>
  
        </form>
  
      </div>
      </div>
    )
  }