// src/routes/GuestRoute.jsx
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const GuestRoute = ({ children }) => {
  const { token } = useUser()
  return !token ? children : <Navigate to="/dashboard" replace />
}

export default GuestRoute