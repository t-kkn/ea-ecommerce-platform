"use client"

import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth"
import Navbar from "../../../components/Navbar"

export default function ProfilePage() {

    const [user, setUser] = useState<any>(null)

  useEffect(() => {

    async function fetchProfile() {

      const token = getToken()

      const res = await fetch(
        "http://localhost:5001/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await res.json()

      setUser(data.user)
    }

    fetchProfile()

  }, [])

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div>
        <Navbar></Navbar>

    <div className="max-w-3xl mx-auto py-16">

      <h1 className="text-3xl font-bold mb-10">
        My Profile
      </h1>

      <div className="border p-6 rounded">

        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>User ID:</strong> {user.id}
        </p>

      </div>

    </div>
    </div>
  )
}