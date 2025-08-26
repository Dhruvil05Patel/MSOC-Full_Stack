// src/pages/OwnerDashboard.jsx
import React, { useState } from "react"
import PageWrapper from "../components/pageWrapper"
import BranchList from "./OwnerDashboard/Branches/BranchList"
import StylistList from "./OwnerDashboard/Stylists/StylistList"
import DashboardOverview from "./OwnerDashboard/DashboardOverview/DashboardOverview"
import ServiceList from "./OwnerDashboard/Services/ServiceList"
import AppointmentList from "./OwnerDashboard/Appointments/AppointmentList"

function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const menuItems = [
    { key: "overview", label: "Dashboard Overview" },
    { key: "branches", label: "Manage Branches" },
    { key: "stylists", label: "Manage Stylists" },
    { key: "services", label: "Manage Services" },
    { key: "appointments", label: "Manage Appointments" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "branches":
        return <BranchList />
      case "stylists":
        return <StylistList />
      case "services":
        return <ServiceList />
      case "appointments":
        return <AppointmentList/>
      case "overview":
      default:
        return <DashboardOverview />
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-pink-100 p-4 md:min-h-screen">
          <h2 className="text-xl font-bold text-pink-600 mb-6">Owner Panel</h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full text-left px-4 py-2 rounded-md transition ${
                      activeTab === item.key
                        ? "bg-pink-500 text-white"
                        : "hover:bg-pink-200"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 p-4 md:p-8 bg-gray-50 rounded-lg shadow-inner">
          {renderContent()}
        </main>
      </div>
    </PageWrapper>
  )
}

export default OwnerDashboard