export async function apiFetch(url: string, options: any = {}) {

    const token = localStorage.getItem("token")
  
    const res = await fetch(url, {
      ...options, // spread existing fetch options (method, body, etc.)

      headers: {
        "Content-Type": "application/json", // tell server we send JSON data
        Authorization: `Bearer ${token}`,   // attach JWT token for authentication
        ...options.headers                  // allow custom headers to override/add
      }
    })
  
    if (res.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  
    return res
  }