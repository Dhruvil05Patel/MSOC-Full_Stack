// src/pages/LoginPage.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { motion } from 'framer-motion'
import { fadeInUp } from '../animations/motionVariants'
import PageWrapper from '../components/pageWrapper'
import toast from 'react-hot-toast'
import axios from '../utils/axios'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setRole, setToken, setUser } = useUser()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/users/login', { email, password })
      const { user, token } = res.data
      localStorage.setItem('token', token)
      setRole(user.role)
      setToken(token)
      setUser(user)
      toast.success(`Welcome, ${user.name}!`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid credentials!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="bg-[#FAF9F6] min-h-screen py-32 px-6 flex items-center justify-center text-[#1A1A1A]">
        <motion.div {...fadeInUp} className="w-full max-w-md bg-white/60 backdrop-blur-md p-10 md:p-14 border border-[#1A1A1A]/5 rounded-2xl shadow-sm">
          <h1 className="text-4xl font-serif text-center mb-10">Access <span className="italic text-[#DDA7A5]">Portal</span></h1>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Email Address</label>
              <input
                type="email"
                className="elegant-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Password</label>
              <input
                type="password"
                className="elegant-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="elegant-button-filled w-full py-4 text-sm"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="text-center mt-10 text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">
            New to Éclat?{' '}
            <Link
              to="/register"
              className="text-[#1A1A1A] hover:text-[#DDA7A5] transition-colors font-medium border-b border-[#1A1A1A]/20 pb-0.5"
            >
              Request Access
            </Link>
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

export default LoginPage