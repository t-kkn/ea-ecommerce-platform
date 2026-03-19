"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/ui/Navbar"

export default function LoginPage() {

    const router = useRouter()
    const searchParams = useSearchParams()
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [socialError, setSocialError] = useState("")

    useEffect(() => {

      // Get token and error from URL query params
      const tokenFromQuery = searchParams.get("token")
      const errorFromQuery = searchParams.get("error")

      // If token exists in URL (after social login)
      if (tokenFromQuery) {
        localStorage.setItem("token", tokenFromQuery)
        router.push("/dashboard/orders")
        return
      }

      if (errorFromQuery) {
        setSocialError("Social login failed. Please try again.")
      }

      const token = localStorage.getItem("token")
    
      if (token) {
        router.push("/dashboard/orders")
      }

    }, [router, searchParams])

    function handleGoogleLogin() {
      // Redirect user to backend Google OAuth endpoint
      window.location.href = "http://localhost:5001/api/auth/google"
    }

    function handleFacebookLogin() {
      // Redirect user to backend Facebook auth endpoint
      window.location.href = "http://localhost:5001/api/auth/facebook"
    }
  
    // Function to handle login form submission
    async function handleLogin(e: any) {
  
      e.preventDefault() // Prevent page refresh when form submits

      const normalizedEmail = email.trim().toLowerCase()

      if (!normalizedEmail || !password) {
        alert("Email and password are required")
        return
      }

      try {
  
      // Send login request to backend API
      const res = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json" // Send JSON data
          },
          body: JSON.stringify({
            email: normalizedEmail,
            password
          })
        }
      )
  
      const data = await res.json()
  
      if (res.ok) {
  
        // Save JWT token in localStorage
        localStorage.setItem("token", data.token)
  
        // Redirect user to dashboard
        router.push("/dashboard/orders")
  
      } else {
        alert(data.error)
      }

    } catch (_error) {
      alert("Cannot connect to backend API. Please check if server is running on port 5001.")
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

          {socialError ? (
            <p className="mb-4 text-sm text-red-600">{socialError}</p>
          ) : null}

          <button
            type="button"
            className="w-full bg-red-600 text-white p-3 rounded mb-3"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full bg-blue-700 text-white p-3 rounded mb-4"
            onClick={handleFacebookLogin}
          >
            Continue with Facebook
          </button>

          <div className="text-center text-sm text-gray-500 mb-4">
            or login with email
          </div>
  
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
  
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
  
          <button
            className="w-full bg-blue-600 text-white p-3 rounded">
            Login
          </button>
  
        </form>
  
      </div>
      </div>
    )
  }
