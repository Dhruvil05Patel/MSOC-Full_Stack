// src/utils/axios.js
import axios from "axios"

// Base URL should ideally come from env vars for prod/dev flexibility
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // true only if using cookies for auth
  timeout: 10000,
})

// ✅ Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Safari-specific headers
    config.headers["X-Requested-With"] = "XMLHttpRequest"

    if (import.meta.env.DEV) {
      console.log("🚀 Request:", config.method?.toUpperCase(), config.url, config)
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ✅ Response interceptor
instance.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log("✅ Response:", response.status, response.config.url, response.data)
    }
    return response
  },
  (error) => {
    // Network or CORS issues
    if (error.code === "ERR_NETWORK") {
      console.error("❌ Network error - server might be down or CORS issue")
    }

    // Unauthorized (token expired or invalid)
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized - logging out user")
      localStorage.removeItem("token")
      // Optionally redirect to login
      window.location.href = "/login"
    }

    // Handle validation errors
    if (error.response?.status === 400) {
      console.warn("⚠️ Validation Error:", error.response.data)
    }

    return Promise.reject(error)
  }
)

export default instance