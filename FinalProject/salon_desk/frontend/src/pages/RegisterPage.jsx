// src/pages/RegisterPage.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp } from '../animations/motionVariants'
import PageWrapper from '../components/pageWrapper'
import toast from 'react-hot-toast'
import axios from '../utils/axios'
import { useUser } from '../context/UserContext'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role] = useState('client')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { setRole: setUserRole, setToken, setUser } = useUser()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const registerRes = await axios.post('/users/register', { name, email, phone, password, role })
      if (registerRes.status !== 201 && registerRes.status !== 200) {
        throw new Error('Registration failed')
      }

      const loginRes = await axios.post('/users/login', { email, password })
      const { user, token } = loginRes.data

      localStorage.setItem('token', token)
      setUser(user)
      setUserRole(user.role)
      setToken(token)
      toast.success(`Welcome to Éclat, ${user.name}`)
      navigate('/dashboard')
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        toast.error('Network error. Please try again later.')
      } else if (err.response?.status === 409) {
        toast.error('Identity already registered. Please sign in.')
      } else {
        toast.error(err?.response?.data?.message || 'Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="bg-[#FAF9F6] min-h-screen py-24 px-6 flex items-center justify-center text-[#1A1A1A]">
        <motion.div {...fadeInUp} className="w-full max-w-lg bg-white/60 backdrop-blur-md p-10 md:p-14 border border-[#1A1A1A]/5 rounded-2xl shadow-sm">
          <h1 className="text-4xl font-serif text-center mb-10">Client <span className="italic text-[#DDA7A5]">Registration</span></h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Full Name</label>
                <input
                  type="text"
                  className="elegant-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Phone Number</label>
                <input
                  type="tel"
                  className="elegant-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Password</label>
                <input
                  type="password"
                  className="elegant-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="elegant-button-filled w-full py-4 text-sm"
              >
                {loading ? 'Creating Identity...' : 'Register'}
              </button>
            </div>
          </form>

          <p className="text-center mt-10 text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-[#1A1A1A] hover:text-[#DDA7A5] transition-colors font-medium border-b border-[#1A1A1A]/20 pb-0.5"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

export default RegisterPage
