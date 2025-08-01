// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/Homepage'
import ServicePage from './pages/Servicepage'
import StylistPage from './pages/StylistPage'
import AppointmentPage from './pages/AppointmentPage'
import DashboardPage from './pages/DashboardPage'
import OwnerDashboard from './pages/OwnerDashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import { useUser } from './context/UserContext'
import PrivateRoute from './routes/PrivateRoute'
import GuestRoute from './routes/GuestRoute'
import './App.css'

function App() {
  const { role } = useUser()
  const isLoggedIn = !!role

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/stylist" element={<StylistPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />

        {/* Auth Pages */}
  <Route
    path="/login"
    element={
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    }
  />
  <Route
    path="/register"
    element={
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    }
  />

        {/* Dashboard Routes (Role Protected) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['owner', 'client']}>
              {role === 'owner' ? <OwnerDashboard /> : <DashboardPage />}
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App