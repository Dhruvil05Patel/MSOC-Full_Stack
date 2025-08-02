// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { token, role } = useUser()

  if (!token) return <Navigate to="/login" replace />

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />  // or a 403 page
  }

  return children
}

export default PrivateRoute