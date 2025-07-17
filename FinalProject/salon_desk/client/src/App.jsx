import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/Homepage'
import ServicePage from './pages/Servicepage'
import StylistPage from './pages/StylistPage'
import AppointmentPage from './pages/AppointmentPage'
import DashboardPage from './pages/DashboardPage'
import OwnerDashboard from './pages/OwnerDashboard'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import { useUser } from './context/UserContext'
import './App.css'

function App() {
  const { role } = useUser()

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/stylist" element={<StylistPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />

        {/* Dynamic Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            role === 'owner' ? (
              <OwnerDashboard />
            ) : role === 'client' ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
