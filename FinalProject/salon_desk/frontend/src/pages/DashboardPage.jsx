import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import { useUser } from '../context/UserContext'

function DashboardPage() {
  const { user } = useUser()

  if (!user) {
    return (
      <PageWrapper>
        <div className="text-center py-24 font-semibold text-gray-600">Loading user info...</div>
      </PageWrapper>
    )
  }

  const upcomingAppointments = [
    {
      service: "Hair Spa",
      stylist: "Priya Sharma",
      date: "12 July 2025",
      time: "3:00 PM"
    },
    {
      service: "Men's Haircut",
      stylist: "Raj Malhotra",
      date: "18 July 2025",
      time: "5:00 PM"
    }
  ];

  const appointmentHistory = [
    {
      service: "Luxury Facial",
      stylist: "Ananya Desai",
      date: "20 June 2025",
      status: "Completed"
    },
    {
      service: "Bridal Makeup",
      stylist: "Priya Sharma",
      date: "15 May 2025",
      status: "Completed"
    }
  ];

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.h1
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Client Dashboard
        </motion.h1>

        {/* ✅ Dynamic Profile */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-10 text-center"
        >
          <div className="w-24 h-24 mx-auto bg-pink-100 rounded-full mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl font-bold text-pink-500 mb-6"
        >
          Upcoming Appointments
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {upcomingAppointments.map((appt, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
              className="bg-white p-5 rounded-xl shadow text-center"
            >
              <h3 className="text-lg font-bold mb-1">{appt.service}</h3>
              <p className="text-gray-600">with {appt.stylist}</p>
              <div className="text-gray-500 mt-2">{appt.date} | {appt.time}</div>
              <button className="mt-3 bg-pink-500 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-600 transition">
                Cancel
              </button>
            </motion.div>
          ))}
        </div>

        {/* Appointment History */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl font-bold text-pink-500 mb-6"
        >
          Appointment History
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointmentHistory.map((appt, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.8 }}
              className="bg-white p-5 rounded-xl shadow text-center"
            >
              <h3 className="text-lg font-bold mb-1">{appt.service}</h3>
              <p className="text-gray-600">with {appt.stylist}</p>
              <div className="text-gray-500 mt-2">{appt.date}</div>
              <div className="mt-2 font-semibold text-green-600">{appt.status}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </PageWrapper>
  )
}

export default DashboardPage
