"use client"

import AuthGuard from "../../../components/AuthGuard"
import OrdersPage from "./OrdersContent"

export default function Page() {
    return (
      <AuthGuard>
        <OrdersPage></OrdersPage>
      </AuthGuard>
    )
  }