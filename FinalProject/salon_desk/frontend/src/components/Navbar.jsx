import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useUser } from '../context/UserContext'
import toast from 'react-hot-toast'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const { role, user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Signed out seamlessly.')
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
    <nav className="relative bg-[#FAF9F6] border-b elegant-border-b py-6 px-6 md:px-16 flex justify-between items-center z-50 text-[#1A1A1A]">
      {/* Brand */}
      <Link to="/" className="text-3xl md:text-4xl font-serif tracking-wide text-[#1A1A1A] hover:opacity-70 transition-opacity">
        Éclat <span className="italic text-[#DDA7A5]">Salon</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-12 font-sans font-light text-sm tracking-[0.15em] uppercase items-center">
        <Link to="/" className="hover:text-[#DDA7A5] transition-colors">Home</Link>
        <Link to="/services" className="hover:text-[#DDA7A5] transition-colors">Services</Link>
        <Link to="/stylist" className="hover:text-[#DDA7A5] transition-colors">Stylists</Link>

        {/* Show Book only for logged in clients */}
        {role === 'client' && (
          <Link to="/appointment" className="hover:text-[#DDA7A5] transition-colors">Reserve</Link>
        )}

        {role ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-2 py-2 hover:opacity-70 transition-opacity group"
            >
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#FAF9F6] flex items-center justify-center font-sans font-medium text-xs">
                {avatarInitial}
              </div>
              <span className="font-sans font-medium">{firstName}</span>
              <ChevronDown size={14} className="text-[#1A1A1A]" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-4 bg-[#FAF9F6] border elegant-border w-56 z-50 flex flex-col shadow-sm">
                <button
                  onClick={handleDashboard}
                  className="w-full text-left px-6 py-4 text-xs font-sans font-medium uppercase tracking-widest hover:bg-[#F0EDE5] transition-colors border-b elegant-border-b"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-4 text-xs font-sans font-medium uppercase tracking-widest text-[#DDA7A5] hover:bg-[#F0EDE5] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="elegant-button">
            Sign In / Sign Up
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#1A1A1A] hover:text-[#DDA7A5] transition-colors">
          {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAF9F6] border-b elegant-border-b flex flex-col items-start px-6 py-12 space-y-8 z-40 md:hidden font-sans font-light text-xl uppercase tracking-widest">
          <Link to="/" onClick={() => setIsOpen(false)} className="w-full hover:text-[#DDA7A5] transition-colors">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="w-full hover:text-[#DDA7A5] transition-colors">Services</Link>
          <Link to="/stylist" onClick={() => setIsOpen(false)} className="w-full hover:text-[#DDA7A5] transition-colors">Stylists</Link>

          {role === 'client' && (
            <Link to="/appointment" onClick={() => setIsOpen(false)} className="w-full text-[#DDA7A5] hover:opacity-70 transition-opacity">Reserve</Link>
          )}

          <div className="w-full h-px bg-[rgba(26,26,26,0.1)] my-6"></div>

          {role ? (
            <>
              <button onClick={handleDashboard} className="text-left w-full hover:text-[#DDA7A5] transition-colors">Dashboard</button>
              <button onClick={handleLogout} className="text-left w-full text-[#DDA7A5] hover:opacity-70 transition-opacity">Sign Out</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-[#DDA7A5] hover:opacity-70 transition-opacity">Sign In / Portal</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar