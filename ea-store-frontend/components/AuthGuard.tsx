"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { getToken } from "../app/lib/auth"

export default function AuthGuard({ children }: any) {

    const router = useRouter()
  
    useEffect(() => {
  
      const token = getToken()
  
      if (!token) {
        router.push("/login")
      }
  
    }, [])
  
    return children
  }