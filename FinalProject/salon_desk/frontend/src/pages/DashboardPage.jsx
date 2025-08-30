import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import { useUser } from '../context/UserContext'
import axios from '../utils/axios'
import toast from 'react-hot-toast'

function DashboardPage() {
  const { user } = useUser()
  const [upcoming, setUpcoming] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?._id) {
      fetchAppointments(user._id)
    }
  }, [user])

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
      toast.error("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status: "cancelled" })
      toast.success("Appointment cancelled")
      fetchAppointments(user._id)
    } catch (err) {
      toast.error("Failed to cancel appointment")
    }
  }

  if (!user || loading) {
    return (
      <PageWrapper>
        <div className="text-center py-24 font-semibold text-gray-600">
          Loading dashboard...
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h1 {...fadeInUp} className="text-3xl md:text-4xl font-bold text-center mb-10">
          Client Dashboard
        </motion.h1>

        {/* Profile */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-10 text-center">
          <div className="w-24 h-24 mx-auto bg-pink-100 rounded-full mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
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
    </PageWrapper>
  )
}

export default DashboardPage