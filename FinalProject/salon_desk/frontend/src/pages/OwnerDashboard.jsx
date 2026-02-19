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
    { key: "branches", label: "Branches" },
    { key: "stylists", label: "Stylists" },
    { key: "services", label: "Services" },
    { key: "appointments", label: "Appointments" },
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
      <div className="flex flex-col md:flex-row min-h-screen text-[#F4F4F5]">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-[#27272A] bg-[#121212] p-8">
          <h2 className="text-4xl lg:text-5xl font-black text-[#E63946] mb-12 uppercase tracking-tighter">
            Owner <br />
            <span className="text-[#F4F4F5]">Panel</span>
          </h2>
          <nav>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full text-left px-6 py-4 rounded-none transition-colors border text-lg uppercase font-bold tracking-widest ${activeTab === item.key
                        ? "bg-[#E63946] text-[#F4F4F5] border-[#E63946]"
                        : "bg-transparent text-[#a1a1aa] border-[#27272A] hover:border-[#F4F4F5] hover:text-[#F4F4F5]"
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
        <main className="w-full md:w-3/4 md:p-12 bg-[#1C1C1C]">
          {renderContent()}
        </main>
      </div>
    </PageWrapper>
  )
}

export default OwnerDashboard