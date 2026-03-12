export function getToken() {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token")
  }

  export function getUserIdFromToken() {
    const token = getToken()
    if (!token) return null

    try {
      const payloadPart = token.split(".")[1]
      if (!payloadPart) return null

      const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join("")
      )

      const payload = JSON.parse(jsonPayload)
      return payload.userId ?? null
    } catch (_error) {
      return null
    }
  }
  
  export function logout() {
    localStorage.removeItem("token")
  }
