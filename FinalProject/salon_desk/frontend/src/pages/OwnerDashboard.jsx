// src/pages/OwnerDashboard.jsx
import React, { useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import BranchList from './OwnerDashboard/Branches/BranchList'
import StylistList from './OwnerDashboard/Stylists/StylistList'
import DashboardOverview from './OwnerDashboard/DashboardOverview'

function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'branches':
        return <BranchList />
      case 'stylists':
        return <StylistList />
      case 'overview':
      default:
        return <DashboardOverview />
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-pink-100 p-4 md:min-h-screen">
          <h2 className="text-xl font-bold text-pink-600 mb-4">Owner Panel</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'overview'
                    ? 'bg-pink-500 text-white'
                    : 'hover:bg-pink-200'
                }`}
              >
                Dashboard Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('branches')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'branches'
                    ? 'bg-pink-500 text-white'
                    : 'hover:bg-pink-200'
                }`}
              >
                Manage Branches
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('stylists')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'stylists'
                    ? 'bg-pink-500 text-white'
                    : 'hover:bg-pink-200'
                }`}
              >
                Manage Stylists
              </button>
            </li>
          </ul>
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