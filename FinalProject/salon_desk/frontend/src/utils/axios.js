// src/utils/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

// ✅ Add JWT token to all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance