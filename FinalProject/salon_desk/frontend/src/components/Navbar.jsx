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
    toast.success('LOGGED OUT.')
    setIsOpen(false)
    setShowDropdown(false)
    navigate('/')
  }

  const handleDashboard = () => {
    navigate('/dashboard')
    setIsOpen(false)
    setShowDropdown(false)
  }

  const firstName = user?.name?.split(' ')[0] || 'USER'
  const avatarInitial = user?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <nav className="relative bg-[#121212] border-b border-[#27272A] py-4 px-6 md:px-12 flex justify-between items-center z-50 text-[#F4F4F5]">
      {/* Brand */}
      <Link to="/" className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#F4F4F5] hover:text-[#E63946] transition-colors">
        Salon <span className="text-[#E63946]">Desk</span>.
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 font-bold text-sm tracking-widest uppercase items-center">
        <Link to="/" className="hover:text-[#E63946] transition-colors">Home</Link>
        <Link to="/services" className="hover:text-[#E63946] transition-colors">Services</Link>
        <Link to="/stylist" className="hover:text-[#E63946] transition-colors">Stylists</Link>
        {/* Show Book only for logged in clients */}
        {role === 'client' && (
          <Link to="/appointment" className="hover:text-[#E63946] transition-colors">Book</Link>
        )}

        {role ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-6 py-2 brutalist-pill bg-transparent hover:bg-[#E63946] hover:border-[#E63946] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#F4F4F5] text-[#121212] flex items-center justify-center font-black">
                {avatarInitial}
              </div>
              <span className="font-bold text-[#F4F4F5]">{firstName}</span>
              <ChevronDown size={18} className="text-[#F4F4F5]" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-4 bg-[#1C1C1C] brutalist-border w-56 z-50 flex flex-col">
                <button
                  onClick={handleDashboard}
                  className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#27272A] transition-colors border-b border-[#27272A]"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#E63946] hover:bg-[#27272A] transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="brutalist-pill px-6 py-2 text-[#F4F4F5] hover:bg-[#F4F4F5] hover:text-[#121212] transition-colors">
            Login / Portal
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#F4F4F5] hover:text-[#E63946] transition-colors">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#121212] brutalist-border-b border-[#27272A] flex flex-col items-start px-6 py-8 space-y-6 z-40 md:hidden font-black text-2xl uppercase tracking-widest">
          <Link to="/" onClick={() => setIsOpen(false)} className="w-full hover:text-[#E63946] transition-colors">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="w-full hover:text-[#E63946] transition-colors">Services</Link>
          <Link to="/stylist" onClick={() => setIsOpen(false)} className="w-full hover:text-[#E63946] transition-colors">Stylists</Link>

          {role === 'client' && (
            <Link to="/appointment" onClick={() => setIsOpen(false)} className="w-full text-[#E63946] hover:text-[#F4F4F5] transition-colors">Book</Link>
          )}

          <div className="w-full h-px bg-[#27272A] my-4"></div>

          {role ? (
            <>
              <button w-full onClick={handleDashboard} className="text-left w-full hover:text-[#E63946] transition-colors">Dashboard</button>
              <button w-full onClick={handleLogout} className="text-left w-full text-[#E63946] hover:text-[#F4F4F5] transition-colors">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-[#E63946] hover:text-[#F4F4F5] transition-colors">Login / Portal</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar