// src/pages/OwnerDashboard/DashboardOverview.jsx
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp } from "../../../animations/motionVariants"
import axios from "../../../utils/axios"
import toast from "react-hot-toast"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"

function DashboardOverview() {
  const [stats, setStats] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [topServices, setTopServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOverview()
  }, [])

  const fetchOverview = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/dashboard/overview") // backend endpoint
      setStats(res.data.stats || {})
      setRevenueData(res.data.revenueData || [])
      setTopServices(res.data.topServices || [])
    } catch (err) {
      toast.error("⚠️ Failed to load dashboard overview")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="w-10 h-10 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <p className="text-center text-gray-500 mt-12">
        No dashboard data available.
      </p>
    )
  }

  return (
    <motion.div {...fadeInUp} className="space-y-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-pink-100 p-6 rounded-xl text-center shadow hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-pink-600">
            ₹{(stats.revenue || 0).toLocaleString("en-IN")}
          </h3>
          <p className="text-gray-600">Total Revenue</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-xl text-center shadow hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-blue-600">
            {stats.appointments || 0}
          </h3>
          <p className="text-gray-600">Appointments</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl text-center shadow hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-green-600">
            {stats.branches || 0}
          </h3>
          <p className="text-gray-600">Branches</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl text-center shadow hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-purple-600">
            {stats.stylists || 0}
          </h3>
          <p className="text-gray-600">Stylists</p>
        </div>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="bg-white shadow rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          Monthly Revenue
        </h3>
        <div className="h-72">
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec4899"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center mt-24">
              No revenue data available
            </p>
          )}
        </div>
      </motion.div>

      {/* Top Services */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-white shadow rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          Top Performing Services
        </h3>
        <div className="h-72">
          {topServices.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topServices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center mt-24">
              No service data available
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardOverview