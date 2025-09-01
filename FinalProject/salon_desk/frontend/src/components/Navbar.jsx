import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useUser } from '../context/UserContext'
import './Navbar.css'
import toast from 'react-hot-toast'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const { role, user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully!')
    setIsOpen(false)
    setShowDropdown(false)
    navigate('/')
  }

  const handleDashboard = () => {
    navigate('/dashboard')
    setIsOpen(false)
    setShowDropdown(false)
  }

  const firstName = user?.name?.split(' ')[0] || 'User'
  const avatarInitial = user?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <nav className="relative bg-pink-100 py-4 px-6 flex justify-between items-center shadow z-50">
      {/* Brand */}
      <Link to="/" className="text-xl md:text-2xl font-bold text-pink-600">
        Éclat
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-medium items-center">
        <Link to="/" className="hover:text-pink-500">Home</Link>
        <Link to="/services" className="hover:text-pink-500">Services</Link>
        <Link to="/stylist" className="hover:text-pink-500">Stylists</Link>
        {/* Show Book only for logged in clients */}
        {role === 'client' && (
          <Link to="/appointment" className="hover:text-pink-500">Book</Link>
        )}

        {role ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-1 border border-pink-300 rounded-full bg-white hover:bg-pink-200 transition"
            >
              <div className="w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center">
                {avatarInitial}
              </div>
              <span className="text-pink-700 font-medium">{firstName}</span>
              <ChevronDown size={16} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden w-40 z-50">
                <button
                  onClick={handleDashboard}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-pink-50"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-pink-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
        <div className="absolute top-16 left-0 w-full bg-pink-50 flex flex-col items-center space-y-4 py-6 shadow-md z-40 md:hidden">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Services</Link>
          <Link to="/stylist" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Stylists</Link>
          {/* Show Book only for logged in clients */}
          {role === 'client' && (
            <Link to="/appointment" onClick={() => setIsOpen(false)} className="text-pink-700 font-medium">Book</Link>
          )}

          {role ? (
            <>
              <button onClick={handleDashboard} className="text-pink-700 font-medium">Dashboard</button>
              <button onClick={handleLogout} className="text-red-500 font-medium">Logout</button>
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