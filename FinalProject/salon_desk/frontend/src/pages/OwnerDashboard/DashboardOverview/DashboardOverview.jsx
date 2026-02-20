// src/pages/OwnerDashboard/DashboardOverview/DashboardOverview.jsx
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp } from "../../../animations/motionVariants"
import axios from "../../../utils/axios"
import toast from "react-hot-toast"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar,
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
      const res = await axios.get("/dashboard/overview")
      setStats(res.data.stats || {})
      setRevenueData(res.data.revenueData || [])
      setTopServices(res.data.topServices || [])
    } catch (err) {
      toast.error("Failed to load overview analytics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-sm font-sans font-light tracking-widest uppercase text-[#1A1A1A]/40 animate-pulse">Compiling Analytics...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <p className="text-center font-serif italic text-gray-500 mt-12">
        No analytical data available currently.
      </p>
    )
  }

  return (
    <motion.div {...fadeInUp} className="space-y-12">
      {/* Heading */}
      <div className="border-b elegant-border-b pb-4">
        <h2 className="text-3xl font-serif text-[#1A1A1A]">
          Executive <span className="italic text-[#DDA7A5]">Summary</span>
        </h2>
      </div>

      {/* Stats Cards */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-8 text-center transition-shadow shadow-sm">
          <h3 className="text-3xl font-serif text-[#1A1A1A] mb-2">
            ₹{(stats.revenue || 0).toLocaleString("en-IN")}
          </h3>
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#DDA7A5] font-medium">Total Revenue</p>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-8 text-center transition-shadow shadow-sm">
          <h3 className="text-3xl font-serif text-[#1A1A1A] mb-2">
            {stats.appointments || 0}
          </h3>
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60">Reservations</p>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-8 text-center transition-shadow shadow-sm">
          <h3 className="text-3xl font-serif text-[#1A1A1A] mb-2">
            {stats.branches || 0}
          </h3>
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60">Sanctuaries</p>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-8 text-center transition-shadow shadow-sm">
          <h3 className="text-3xl font-serif text-[#1A1A1A] mb-2">
            {stats.stylists || 0}
          </h3>
          <p className="font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60">Specialists</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="bg-white/50 backdrop-blur-sm border elegant-border p-8"
        >
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-6 border-b elegant-border-b pb-4">
            Financial <span className="italic text-[#1A1A1A]/50">Trajectory</span>
          </h3>
          <div className="h-72">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FAF9F6" />
                  <XAxis dataKey="month" stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', fontFamily: 'Inter', fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#DDA7A5"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#DDA7A5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-[#1A1A1A]/40 text-center mt-24 font-serif italic text-sm">
                No revenue data available
              </p>
            )}
          </div>
        </motion.div>

        {/* Top Services */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="bg-white/50 backdrop-blur-sm border elegant-border p-8"
        >
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-6 border-b elegant-border-b pb-4">
            Sought-After <span className="italic text-[#1A1A1A]/50">Treatments</span>
          </h3>
          <div className="h-72">
            {topServices.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topServices} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FAF9F6" />
                  <XAxis dataKey="service" stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#FAF9F6' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', fontFamily: 'Inter', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#DDA7A5" maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-[#1A1A1A]/40 text-center mt-24 font-serif italic text-sm">
                No service data available
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DashboardOverview