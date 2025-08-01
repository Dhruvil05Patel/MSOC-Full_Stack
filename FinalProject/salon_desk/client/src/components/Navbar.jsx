import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useUser } from '../context/UserContext'
import './Navbar.css'
import toast from 'react-hot-toast'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { role, setRole } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    setRole(null)
    toast.success('Logged out successfully!')
    setIsOpen(false)
    navigate('/')
  }

  const handleDashboard = () => {
    navigate('/dashboard')
    setIsOpen(false)
  }

  return (
    <nav className="relative bg-pink-100 py-4 px-6 flex justify-between items-center shadow">
      {/* Brand */}
      <Link to="/" className="text-xl md:text-2xl font-bold text-pink-600">
        Éclat
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-medium">
        <Link to="/" className="hover:text-pink-500">Home</Link>
        <Link to="/services" className="hover:text-pink-500">Services</Link>
        <Link to="/stylist" className="hover:text-pink-500">Stylists</Link>
        <Link to="/appointment" className="hover:text-pink-500">Book</Link>

        {/* Conditionally show Dashboard/Login/Logout */}
        {role ? (
          <>
            <button onClick={handleDashboard} className="text-pink-500 hover:underline">Dashboard</button>
            <button onClick={handleLogout} className="text-pink-500 hover:underline">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-pink-500 hover:underline">Login</Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-pink-600">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-pink-50 flex flex-col items-center space-y-4 py-6 shadow-md z-50 md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Services</Link>
          <Link to="/stylist" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Stylists</Link>
          <Link to="/appointment" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Book</Link>

          {role ? (
            <>
              <button onClick={handleDashboard} className="text-pink-700 font-medium">Dashboard</button>
              <button onClick={handleLogout} className="text-pink-700 font-medium">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
