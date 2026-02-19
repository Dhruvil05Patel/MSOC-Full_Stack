import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import { useUser } from '../context/UserContext'
import axios from '../utils/axios'
import toast from 'react-hot-toast'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

function DashboardPage() {
  const { user, loading: userLoading } = useUser()
  const [upcoming, setUpcoming] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "", phone: "" })

  useEffect(() => {
    if (user?.id || user?._id) {
      const userId = user.id || user._id
      fetchAppointments(userId)
      setEditForm({ name: user.name, email: user.email, password: "", phone: user.phone || "" })
    } else if (!userLoading && !user) {
      setLoading(false)
    }
  }, [user, userLoading])

  const fetchAppointments = async (clientId) => {
    try {
      setLoading(true)
      const res = await axios.get(`/appointments/client/${clientId}`)
      if (res.data.success) {
        setUpcoming(res.data.upcoming)
        setHistory(res.data.history)
      } else {
        toast.error("Failed to fetch appointments")
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
      toast.error("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status: "cancelled" })
      toast.success("Appointment cancelled")
      fetchAppointments(user.id || user._id)
    } catch (err) {
      toast.error("Failed to cancel appointment")
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(`/users/${user.id || user._id}`, editForm)
      if (res.data.success) {
        toast.success("Profile updated")
        setShowEditModal(false)
      }
    } catch (err) {
      toast.error("Failed to update profile")
    }
  }

  if (userLoading || loading) {
    return (
      <PageWrapper>
        <div className="flex h-[80vh] items-center justify-center font-bold text-2xl uppercase tracking-widest text-[#F4F4F5]">
          Loading...
        </div>
      </PageWrapper>
    )
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex h-[80vh] items-center justify-center font-bold text-2xl uppercase tracking-widest text-[#F4F4F5]">
          ACCESS DENIED. PLEASE LOGIN.
        </div>
      </PageWrapper>
    )
  }

  // 📊 Prepare chart data
  const expenseData = history.map(h => ({
    service: h.service?.name,
    cost: h.service?.price || 0
  }))

  const appointmentData = history.map(h => ({
    date: new Date(h.date).toLocaleDateString(),
    count: 1
  }))

  return (
    <PageWrapper>
      <div className="py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto text-[#F4F4F5]">
        {/* Heading */}
        <motion.h1 {...fadeInUp} className="text-6xl md:text-8xl lg:text-9xl font-black mb-16 tracking-tighter uppercase leading-none">
          Client <br />
          <span className="text-[#E63946]">Dashboard</span>
        </motion.h1>

        {/* Profile Grid */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="brutalist-border bg-[#1C1C1C] p-8 md:p-12 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-[#121212] brutalist-border overflow-hidden relative">
              {user.profilePhoto ? (
                <img 
                  src={user.profilePhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover grayscale contrast-125"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center text-6xl font-black text-[#E63946] ${user.profilePhoto ? 'hidden' : 'flex'}`}>
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">{user.name}</h2>
            <div className="flex flex-col space-y-2 text-[#a1a1aa] uppercase tracking-widest text-sm font-medium">
              <span>{user.email}</span>
              <span>{user.phone || "NO PHONE ADDED"}</span>
            </div>
            <div className="pt-6">
              <button
                onClick={() => setShowEditModal(true)}
                className="brutalist-pill px-8 py-3 bg-[#E63946] text-[#F4F4F5] font-bold hover:bg-[#121212] hover:text-[#E63946] hover:border-[#E63946] transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Analytics Section */}
        <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Expenses */}
          <div className="brutalist-border bg-[#1C1C1C] p-6 md:p-10">
            <h3 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight">Total Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                <XAxis dataKey="service" stroke="#F4F4F5" tick={{fill: '#F4F4F5', fontSize: 12, fontFamily: 'Space Grotesk'}} />
                <YAxis stroke="#F4F4F5" tick={{fill: '#F4F4F5', fontFamily: 'Space Grotesk'}} />
                <Tooltip cursor={{fill: '#27272A'}} contentStyle={{backgroundColor: '#121212', border: '1px solid #27272A', fontFamily: 'Space Grotesk'}} />
                <Bar dataKey="cost" fill="#E63946" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Appointments */}
          <div className="brutalist-border bg-[#1C1C1C] p-6 md:p-10">
            <h3 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight">Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                <XAxis dataKey="date" stroke="#F4F4F5" tick={{fill: '#F4F4F5', fontSize: 12, fontFamily: 'Space Grotesk'}} />
                <YAxis stroke="#F4F4F5" tick={{fill: '#F4F4F5', fontFamily: 'Space Grotesk'}} />
                <Tooltip contentStyle={{backgroundColor: '#121212', border: '1px solid #27272A', fontFamily: 'Space Grotesk'}} />
                <Line type="monotone" dataKey="count" stroke="#E63946" strokeWidth={4} dot={{r: 6, fill: '#E63946', strokeWidth: 2, stroke: '#1C1C1C'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.h2 {...fadeInUp} transition={{ delay: 0.3 }} className="text-5xl md:text-7xl font-black text-[#E63946] mb-8 uppercase brutalist-border-b pb-4">
          Upcoming
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {upcoming.length > 0 ? (
            upcoming.map((appt, index) => (
              <motion.div
                key={appt._id}
                {...fadeInUp}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="brutalist-border bg-[#1C1C1C] p-8 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">{appt.service?.name}</h3>
                  <p className="text-[#a1a1aa] uppercase text-sm tracking-widest mb-6">W/ {appt.stylist?.name}</p>
                  <div className="font-mono text-lg mb-8 uppercase bg-[#121212] p-4 brutalist-border pb-3">
                    {new Date(appt.date).toLocaleDateString()} <br/> {appt.time}
                  </div>
                </div>
                <button
                  onClick={() => cancelAppointment(appt._id)}
                  className="brutalist-pill w-full py-4 bg-transparent text-[#F4F4F5] hover:bg-[#E63946] hover:border-[#E63946] transition-colors font-bold"
                >
                  Cancel Appt
                </button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full brutalist-border p-16 text-center text-[#a1a1aa] font-bold text-xl md:text-2xl uppercase tracking-widest">
              No upcoming appointments. <br />
              <span className="text-[#F4F4F5]">Schedule one today.</span>
            </div>
          )}
        </div>

        {/* Appointment History */}
        <motion.h2 {...fadeInUp} transition={{ delay: 0.6 }} className="text-5xl md:text-7xl font-black mb-8 uppercase brutalist-border-b pb-4 text-[#F4F4F5]">
          History
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {history.length > 0 ? (
            history.map((appt, index) => (
              <motion.div
                key={appt._id}
                {...fadeInUp}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="brutalist-border p-8 flex flex-col justify-between opacity-70 hover:opacity-100 transition-opacity"
              >
                <div>
                  <h3 className="text-3xl font-black mb-2 uppercase text-[#a1a1aa] tracking-tight">{appt.service?.name}</h3>
                  <p className="text-[#a1a1aa] uppercase text-sm tracking-widest mb-6">W/ {appt.stylist?.name}</p>
                  <div className="font-mono text-lg mb-8 text-[#F4F4F5]">
                    {new Date(appt.date).toLocaleDateString()}
                  </div>
                </div>
                <div className={`brutalist-pill text-center py-3 font-bold text-sm ${appt.status === "completed" ? "bg-[#27272A] text-[#F4F4F5] border-[#27272A]" : "border-[#E63946] text-[#E63946]"}`}>
                  {appt.status}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full brutalist-border p-16 text-center text-[#a1a1aa] font-bold text-xl uppercase tracking-widest">
              No past appointments found.
            </div>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-[#121212]/95 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="brutalist-border bg-[#1C1C1C] p-8 md:p-12 w-full max-w-xl">
            <h2 className="text-5xl md:text-6xl font-black mb-10 uppercase tracking-tighter">Edit <span className="text-[#E63946]">Profile</span></h2>
            <div className="space-y-6">
              <input
                type="text"
                value={editForm.name}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="NAME"
                className="w-full p-5 bg-transparent brutalist-border text-[#F4F4F5] font-bold uppercase tracking-widest focus:outline-none focus:border-[#E63946] transition-colors placeholder-[#a1a1aa]"
              />
              <input
                type="email"
                value={editForm.email}
                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                placeholder="EMAIL"
                className="w-full p-5 bg-transparent brutalist-border text-[#F4F4F5] font-bold uppercase tracking-widest focus:outline-none focus:border-[#E63946] transition-colors placeholder-[#a1a1aa]"
              />
              <input
                type="password"
                value={editForm.password}
                onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                placeholder="NEW PASSWORD (OPTIONAL)"
                className="w-full p-5 bg-transparent brutalist-border text-[#F4F4F5] font-bold uppercase tracking-widest focus:outline-none focus:border-[#E63946] transition-colors placeholder-[#a1a1aa]"
              />
              <input
                type="text"
                value={editForm.phone || ""}
                onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="PHONE NUMBER"
                className="w-full p-5 bg-transparent brutalist-border text-[#F4F4F5] font-bold uppercase tracking-widest focus:outline-none focus:border-[#E63946] transition-colors placeholder-[#a1a1aa]"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end mt-12 space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setShowEditModal(false)} 
                className="brutalist-pill w-full sm:w-auto px-10 py-4 bg-transparent text-[#F4F4F5] font-bold hover:bg-[#27272A] hover:border-[#27272A] transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={handleProfileUpdate} 
                className="brutalist-pill w-full sm:w-auto px-10 py-4 bg-[#E63946] border-[#E63946] text-[#F4F4F5] font-bold hover:bg-transparent hover:text-[#E63946] transition-colors"
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default DashboardPage