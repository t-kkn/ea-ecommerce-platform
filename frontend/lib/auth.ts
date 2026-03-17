export function getToken() {
  // Check if running on the server (not in browser)  
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}
  
// Get userId from JWT token
export function getUserIdFromToken() {
  const token = getToken()
  if (!token) return null

    try {
      // Get payload part of JWT
      const payloadPart = token.split(".")[1]
      if (!payloadPart) return null

      // Convert Base64URL to Base64
      const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/")
      
      // Decode Base64 payload to JSON string
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join("")
      )

      const payload = JSON.parse(jsonPayload) // Parse JSON payload
      return payload.userId ?? null // Return userId if exists
    } catch (_error) {
      return null // Return null if token parsing fails
    }
}
  
export function logout() {
    localStorage.removeItem("token")
}
