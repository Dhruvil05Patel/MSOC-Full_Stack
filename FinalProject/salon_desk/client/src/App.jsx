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
import GuestRoute from './routes/GuestRoute'
import { UserProvider, useUser } from './context/UserContext'
import './App.css'

function DashboardRouter() {
  const { role } = useUser()

  if (role === 'owner') return <OwnerDashboard />
  if (role === 'client') return <DashboardPage />

  return <Navigate to="/login" replace />
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/stylist" element={<StylistPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />

          {/* 🔒 Guest-only Routes */}
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

          {/* 🧑‍💼 Dashboard Routes (Protected & Role-Based) */}
          <Route path="/dashboard" element={<DashboardRouter />} />

          {/* 🔁 Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App