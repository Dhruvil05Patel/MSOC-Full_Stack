import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'

function OwnerDashboard() {
  const summaryStats = [
    { title: "Total Revenue", value: "₹2,75,000" },
    { title: "Appointments This Month", value: "340" },
    { title: "Active Branches", value: "5" },
  ];

  const topBranches = [
    { name: "Éclat Gandhinagar", appointments: 120, revenue: "₹80,000" },
    { name: "Éclat Ahmedabad", appointments: 95, revenue: "₹70,000" },
  ];

  const starStylists = [
    { name: "Priya Sharma", appointments: 75, rating: 4.9 },
    { name: "Raj Malhotra", appointments: 65, rating: 4.8 },
  ];

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h1
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Owner Dashboard
        </motion.h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {summaryStats.map((stat, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
              className="bg-pink-100 text-pink-900 rounded-xl p-6 md:p-8 text-center shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Top Branches */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl font-bold text-pink-500 mb-6"
        >
          Top Performing Branches
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {topBranches.map((branch, index) => (
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
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl font-bold text-pink-500 mb-6"
        >
          Star Stylists
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {starStylists.map((stylist, index) => (
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

export default OwnerDashboard
