"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {

    const router = useRouter()
  
    function handleLogout() {
  
      // remove token
      localStorage.removeItem("token")
  
      // go to login page
      router.push("/login")
    }
  
    return (
      <button
        onClick={handleLogout}
        className="text-red-500">
        Logout
      </button>
    )
  }