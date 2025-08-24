// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/Homepage'
import ServicePage from './pages/ServicePage'
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
import AddBranchPage from './pages/OwnerDashboard/Branches/AddBranchPage'
import './App.css'

function App() {
  const { role, loading } = useUser()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

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
        <Route
          path="/dashboard/add-branch"
          element={
            <PrivateRoute allowedRoles={['owner']}>
              <AddBranchPage />
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