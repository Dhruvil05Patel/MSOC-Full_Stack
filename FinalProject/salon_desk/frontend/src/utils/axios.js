// src/utils/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
})

// ✅ Add JWT token to all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // Safari-specific headers
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  
  console.log('🚀 Making request to:', config.url, 'with method:', config.method)
  return config
})

// Add response interceptor for better error handling
instance.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('❌ Axios error:', error.message)
    if (error.code === 'ERR_NETWORK') {
      console.error('❌ Network error - server might be down or CORS issue')
    }
    return Promise.reject(error)
  }
)

export default instance