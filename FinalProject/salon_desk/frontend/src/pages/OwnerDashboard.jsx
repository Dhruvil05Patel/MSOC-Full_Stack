// src/pages/OwnerDashboard.jsx
import React, { useState } from 'react'
import PageWrapper from '../components/pageWrapper'
import BranchList from './OwnerDashboard/Branches/BranchList'
import StylistList from './OwnerDashboard/Stylists/StylistList'
import DashboardOverview from './OwnerDashboard/DashboardOverview'
import ServiceList from './OwnerDashboard/Services/ServiceList'

function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'branches':
        return <BranchList />
      case 'stylists':
        return <StylistList />
      case 'services':
        return <ServiceList />
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
            <li>
              <button
                onClick={() => setActiveTab('services')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'services'
                    ? 'bg-pink-500 text-white'
                    : 'hover:bg-pink-200'
                }`}
              >
                Manage Services
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 p-4 md:p-8">{renderContent()}</div>
      </div>
    </PageWrapper>
  )
}

export default OwnerDashboard