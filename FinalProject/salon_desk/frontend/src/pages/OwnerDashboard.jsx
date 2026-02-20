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
    { key: "overview", label: "Overview" },
    { key: "branches", label: "Sanctuaries" },
    { key: "stylists", label: "Specialists" },
    { key: "services", label: "Treatments" },
    { key: "appointments", label: "Reservations" },
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
        return <AppointmentList />
      case "overview":
      default:
        return <DashboardOverview />
    }
  }

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#FAF9F6] text-[#1A1A1A]">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 md:border-r elegant-border bg-[#F0EDE5]/50 p-8 md:p-12">
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1A1A1A] mb-12">
            Owner <br />
            <span className="italic text-[#DDA7A5]">Dashboard</span>
          </h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-all font-sans text-xs tracking-widest uppercase ${activeTab === item.key
                      ? "bg-white shadow-sm font-medium text-[#1A1A1A]"
                      : "bg-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
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
        <main className="w-full md:w-3/4 p-6 md:p-12">
          {renderContent()}
        </main>
      </div>
    </PageWrapper>
  )
}

export default OwnerDashboard