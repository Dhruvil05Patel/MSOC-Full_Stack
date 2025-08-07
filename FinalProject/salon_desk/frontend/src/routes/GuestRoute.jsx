// src/routes/GuestRoute.jsx
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const GuestRoute = ({ children }) => {
  const { token, role, loading } = useUser()
  
  // Wait for loading to complete before making any decisions
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return !token && !role ? children : <Navigate to="/dashboard" replace />
}

export default GuestRoute