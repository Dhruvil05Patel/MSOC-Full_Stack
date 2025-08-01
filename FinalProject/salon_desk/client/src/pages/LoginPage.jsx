import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { motion } from 'framer-motion'
import { fadeInUp } from '../animations/motionVariants'
import PageWrapper from '../components/pageWrapper'
import toast from 'react-hot-toast'
import axios from '../utils/axios' // ✅ Use custom axios instance

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setRole } = useUser()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/users/login', { email, password })
      const { user, token } = res.data
      localStorage.setItem('token', token)
      setRole(user.role)
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
      <motion.div {...fadeInUp} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow mt-16">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Éclat</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full font-semibold transition ${
              loading
                ? 'bg-pink-300 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600'
            } text-white`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <span
            className="text-pink-500 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Click here to register
          </span>
        </p>
      </motion.div>
    </PageWrapper>
  )
}

export default LoginPage
