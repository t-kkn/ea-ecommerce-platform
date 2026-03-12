"use client"

import { useEffect, useState } from "react"
import LogoutButton from "./LogoutButton"

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {
      setLoggedIn(true)
    }

  }, [])

  return (

    <nav className="bg-black text-white p-4">

      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-xl font-bold">EA Marketplace</h1>
        
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-300">Home</a>

        {loggedIn ? (

          <>
            <a href="/dashboard/orders" className="hover:text-gray-300">Orders</a>
            <a href="/dashboard/profile" className="hover:text-gray-300">Profile</a>
            <LogoutButton></LogoutButton>
          </>

        ) : (

          <>
            <a href="/login" className="hover:text-gray-300">Login</a>
            <a href="/register" className="hover:text-gray-300">Register</a>
          </>

        )}
        </div>
      </div>

    </nav>

  )
}

/* export default function Navbar() {
    return (
      <nav className="bg-black text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <h1 className="text-xl font-bold">EA Marketplace</h1>
  
          <div className="space-x-4">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <a href="/products" className="hover:text-gray-300">Products</a>
            <a href="/dashboard/orders" className="hover:text-gray-300">Orders</a>
            <LogoutButton></LogoutButton>
          </div>
        </div>
      </nav>
    );
  } */