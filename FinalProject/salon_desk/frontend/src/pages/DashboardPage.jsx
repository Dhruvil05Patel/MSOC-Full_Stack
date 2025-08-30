import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import { useUser } from '../context/UserContext'
import axios from '../utils/axios'
import toast from 'react-hot-toast'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

function DashboardPage() {
  const { user, loading: userLoading } = useUser()
  const [upcoming, setUpcoming] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "", phone: "" })

  useEffect(() => {
    if (user?.id || user?._id) {
      const userId = user.id || user._id
      fetchAppointments(userId)
      setEditForm({ name: user.name, email: user.email, password: "", phone: user.phone || "" })
    } else if (!userLoading && !user) {
      setLoading(false)
    }
  }, [user, userLoading])

  const fetchAppointments = async (clientId) => {
    try {
      setLoading(true)
      const res = await axios.get(`/appointments/client/${clientId}`)
      if (res.data.success) {
        setUpcoming(res.data.upcoming)
        setHistory(res.data.history)
      } else {
        toast.error("Failed to fetch appointments")
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
      toast.error("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status: "cancelled" })
      toast.success("Appointment cancelled")
      fetchAppointments(user.id || user._id)
    } catch (err) {
      toast.error("Failed to cancel appointment")
    }
  }

  const handleProfileUpdate = async () => {
    try {
      console.log('Updating profile with:', editForm)
      const res = await axios.put(`/users/${user.id || user._id}`, editForm)
      console.log('Profile update response:', res.data)
      if (res.data.success) {
        toast.success("Profile updated")
        setShowEditModal(false)
        // Update user context with new data
        const updatedUser = { ...user, ...editForm }
        console.log('Updated user data:', updatedUser)
      }
    } catch (err) {
      console.error('Profile update error:', err)
      toast.error("Failed to update profile")
    }
  }

  if (userLoading || loading) {
    return (
      <PageWrapper>
        <div className="text-center py-24 font-semibold text-gray-600">
          Loading dashboard...
        </div>
      </PageWrapper>
    )
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="text-center py-24 font-semibold text-gray-600">
          Please log in to view your dashboard.
        </div>
      </PageWrapper>
    )
  }

  // 📊 Prepare chart data
  const expenseData = history.map(h => ({
    service: h.service?.name,
    cost: h.service?.price || 0
  }))

  const appointmentData = history.map(h => ({
    date: new Date(h.date).toLocaleDateString(),
    count: 1
  }))

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h1 {...fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-10">
          Client Dashboard
        </motion.h1>

        {/* Profile */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-10 text-center relative">
          <div className="w-24 h-24 mx-auto bg-pink-100 rounded-full mb-4 overflow-hidden">
            {user.profilePhoto ? (
              <img 
                src={user.profilePhoto} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onLoad={() => console.log('Image loaded successfully:', user.profilePhoto)}
                onError={(e) => {
                  console.log('Image failed to load:', e.target.src)
                  console.log('Current user profilePhoto:', user.profilePhoto)
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div 
              className={`w-full h-full flex items-center justify-center text-2xl font-bold text-pink-600 ${user.profilePhoto ? 'hidden' : 'flex'}`}
            >
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-600"
          >
            Edit Profile
          </button>
        </motion.div>

        {/* Analytics Section */}
        <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Expenses */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-4">Total Expenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Appointments */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-4">Appointments Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#ec4899" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.h2 {...fadeInUp} transition={{ delay: 0.3 }} className="text-2xl font-bold text-pink-500 mb-6">
          Upcoming Appointments
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {upcoming.length > 0 ? (
            upcoming.map((appt, index) => (
              <motion.div
                key={appt._id}
                {...fadeInUp}
                transition={{ delay: 0.4 + index * 0.2 }}
                className="bg-white p-5 rounded-xl shadow text-center"
              >
                <h3 className="text-lg font-bold mb-1">{appt.service?.name}</h3>
                <p className="text-gray-600">with {appt.stylist?.name}</p>
                <div className="text-gray-500 mt-2">
                  {new Date(appt.date).toLocaleDateString()} | {appt.time}
                </div>
                <button
                  onClick={() => cancelAppointment(appt._id)}
                  className="mt-3 bg-pink-500 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-600 transition"
                >
                  Cancel
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </div>

        {/* Appointment History */}
        <motion.h2 {...fadeInUp} transition={{ delay: 0.6 }} className="text-2xl font-bold text-pink-500 mb-6">
          Appointment History
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.length > 0 ? (
            history.map((appt, index) => (
              <motion.div
                key={appt._id}
                {...fadeInUp}
                transition={{ delay: 0.7 + index * 0.2 }}
                className="bg-white p-5 rounded-xl shadow text-center"
              >
                <h3 className="text-lg font-bold mb-1">{appt.service?.name}</h3>
                <p className="text-gray-600">with {appt.stylist?.name}</p>
                <div className="text-gray-500 mt-2">{new Date(appt.date).toLocaleDateString()}</div>
                <div className={`mt-2 font-semibold ${appt.status === "completed" ? "text-green-600" : "text-gray-600"}`}>
                  {appt.status}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No past appointments</p>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              value={editForm.name}
              onChange={e => setEditForm({ ...editForm, name: e.target.value })}
              placeholder="Name"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="email"
              value={editForm.email}
              onChange={e => setEditForm({ ...editForm, email: e.target.value })}
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              value={editForm.password}
              onChange={e => setEditForm({ ...editForm, password: e.target.value })}
              placeholder="New Password"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              value={editForm.phone || ""}
              onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
              placeholder="Phone Number"
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleProfileUpdate} className="px-4 py-2 bg-pink-500 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default DashboardPage