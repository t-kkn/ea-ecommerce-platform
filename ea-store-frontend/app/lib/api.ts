export async function apiFetch(url: string, options: any = {}) {

    const token = localStorage.getItem("token")
  
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers
      }
    })
  
    if (res.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  
    return res
  }