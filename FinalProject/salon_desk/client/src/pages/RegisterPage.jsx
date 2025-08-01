// src/pages/RegisterPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [role, setRole] = useState('client')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { setRole: setUserRole, setToken, setUser } = useUser()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Step 1: Register the user
      const registerRes = await axios.post('/users/register', {
        name,
        email,
        phone,
        password,
        role
      })

      if (registerRes.status !== 201 && registerRes.status !== 200) {
        throw new Error('Registration failed')
      }

      // Step 2: Auto-login after successful registration
      const loginRes = await axios.post('/users/login', {
        email,
        password
      })

      const { user, token } = loginRes.data
      
      // Set user context values (localStorage sync is automatic via UserContext)
      setUser(user)
      setUserRole(user.role)
      setToken(token)

      toast.success(`Welcome, ${user.name}!`)
      navigate('/dashboard')
    } catch (err) {
      console.error('❌ Registration error:', err)
      toast.error(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <motion.div {...fadeInUp} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow mt-16">
        <h1 className="text-2xl font-bold mb-6 text-center">Register for Éclat</h1>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label className="block font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <div>
            <label className="block font-semibold mb-1">Role</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="client">Client</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full font-semibold transition ${
              loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'
            } text-white`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <span
            className="text-pink-500 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </motion.div>
    </PageWrapper>
  )
}

export default RegisterPage