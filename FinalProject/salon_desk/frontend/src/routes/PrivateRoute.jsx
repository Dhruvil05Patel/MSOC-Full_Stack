// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { token, role, loading } = useUser()

  // Wait for loading to complete before making any decisions
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!token) return <Navigate to="/login" replace />

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />  // or a 403 page
  }

  return children
}

export default PrivateRoute