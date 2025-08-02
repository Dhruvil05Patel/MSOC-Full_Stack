import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import axios from '../utils/axios'

function OwnerDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/owner/dashboard')
        setData(res.data)
      } catch (err) {
        console.error('❌ Dashboard fetch error:', err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-96">
          <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="text-center text-red-600 mt-20 text-lg font-semibold">
          {error}
        </div>
      </PageWrapper>
    )
  }

  const { summary, branches, stylists } = data

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.h1
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Owner Dashboard
        </motion.h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <SummaryCard title="Total Revenue" value={summary.revenue} delay={0.2} />
          <SummaryCard title="Appointments This Month" value={summary.appointments} delay={0.4} />
          <SummaryCard title="Active Branches" value={summary.branches} delay={0.6} />
        </div>

        {/* Top Branches */}
        <motion.h2 {...fadeInUp} transition={{ delay: 0.4, duration: 0.8 }} className="text-2xl font-bold text-pink-500 mb-6">
          Top Performing Branches
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              className="bg-white p-5 rounded-xl shadow text-center"
            >
              <h3 className="text-lg font-bold mb-1">{branch.name}</h3>
              <p className="text-gray-600">Appointments: {branch.appointments}</p>
              <p className="text-pink-500 font-semibold mt-1">Revenue: {branch.revenue}</p>
            </motion.div>
          ))}
        </div>

        {/* Star Stylists */}
        <motion.h2 {...fadeInUp} transition={{ delay: 0.6, duration: 0.8 }} className="text-2xl font-bold text-pink-500 mb-6">
          Star Stylists
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stylists.map((stylist, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.8 }}
              className="bg-white p-5 rounded-xl shadow text-center"
            >
              <h3 className="text-lg font-bold mb-1">{stylist.name}</h3>
              <p className="text-gray-600">Appointments: {stylist.appointments}</p>
              <div className="mt-1 text-yellow-500 font-semibold">⭐ {stylist.rating}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

function SummaryCard({ title, value, delay }) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ delay, duration: 0.8 }}
      className="bg-pink-100 text-pink-900 rounded-xl p-6 md:p-8 text-center shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  )
}

export default OwnerDashboard