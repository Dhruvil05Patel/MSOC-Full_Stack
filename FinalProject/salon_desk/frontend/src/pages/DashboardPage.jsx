import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import { useUser } from '../context/UserContext'
import axios from '../utils/axios'
import toast from 'react-hot-toast'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
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
      toast.error("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status: "cancelled" })
      toast.success("Reservation cancelled")
      fetchAppointments(user.id || user._id)
    } catch (err) {
      toast.error("Failed to cancel reservation")
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(`/users/${user.id || user._id}`, editForm)
      if (res.data.success) {
        toast.success("Profile refined")
        setShowEditModal(false)
      }
    } catch (err) {
      toast.error("Failed to refine profile")
    }
  }

  if (userLoading || loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-[80vh] bg-[#FAF9F6] text-[#1A1A1A]">
          <div className="text-xl font-sans font-light tracking-widest uppercase animate-pulse">Accessing Sanctuary...</div>
        </div>
      </PageWrapper>
    )
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-[80vh] bg-[#FAF9F6] text-[#1A1A1A]">
          <div className="text-center">
            <h2 className="text-4xl font-serif italic text-[#DDA7A5] mb-4">Access Restricted</h2>
            <p className="font-sans text-xs tracking-widest uppercase text-[#1A1A1A]/60">Please identify yourself.</p>
          </div>
        </div>
      </PageWrapper>
    )
  }

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
      <div className="bg-[#FAF9F6] min-h-screen py-24 px-6 md:px-16 text-[#1A1A1A]">
        {/* Heading */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b elegant-border-b pb-8">
          <div>
            <motion.h1 {...fadeInUp} className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight">
              Your <span className="italic text-[#DDA7A5]">Sanctuary</span>
            </motion.h1>
            <p className="mt-4 font-sans font-medium text-xs uppercase tracking-widest text-[#1A1A1A]/60">
              Welcome back, {user.name}
            </p>
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="elegant-button-filled px-8 py-3 text-xs"
          >
            Refine Profile
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div className="max-w-6xl mx-auto mb-24">
          <motion.h2 {...fadeInUp} className="text-3xl font-serif mb-10 border-b elegant-border-b pb-4">
            Upcoming <span className="italic text-[#DDA7A5]">Reservations</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.length > 0 ? (
              upcoming.map((appt, index) => (
                <motion.div
                  key={appt._id}
                  {...fadeInUp}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm p-8 flex flex-col justify-between border elegant-border transition-shadow hover:shadow-sm"
                >
                  <div className="mb-10">
                    <p className="font-sans font-medium text-[10px] uppercase tracking-widest text-[#DDA7A5] mb-4">
                      {new Date(appt.date).toLocaleDateString()} at {appt.time}
                    </p>
                    <h3 className="text-2xl font-serif mb-2">{appt.service?.name}</h3>
                    <p className="text-[#1A1A1A]/60 font-sans text-xs tracking-widest uppercase">
                      Spec. {appt.stylist?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => cancelAppointment(appt._id)}
                    className="text-xs font-sans tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-1 text-[#1A1A1A]/60 hover:text-[#DDA7A5] hover:border-[#DDA7A5] transition-colors self-start"
                  >
                    Cancel Reservation
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-[#1A1A1A]/40 text-lg font-serif italic">Your diary is currently empty.</p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="max-w-6xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Expenses */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <h3 className="text-2xl font-serif mb-8 border-b elegant-border-b pb-4">Treatment <span className="italic text-[#1A1A1A]/50">Investment</span></h3>
            <div className="bg-white/30 backdrop-blur-sm border elegant-border p-6 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={expenseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FAF9F6" vertical={false} />
                  <XAxis dataKey="service" stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#FAF9F6' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', fontFamily: 'Inter', fontSize: '12px' }} />
                  <Bar dataKey="cost" fill="#DDA7A5" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Appointments */}
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <h3 className="text-2xl font-serif mb-8 border-b elegant-border-b pb-4">Visit <span className="italic text-[#1A1A1A]/50">Cadence</span></h3>
            <div className="bg-white/30 backdrop-blur-sm border elegant-border p-6 rounded-lg">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={appointmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FAF9F6" vertical={false} />
                  <XAxis dataKey="date" stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#1A1A1A" tick={{ fill: '#1A1A1A', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', fontFamily: 'Inter', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="count" stroke="#DDA7A5" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#DDA7A5' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Appointment History */}
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeInUp} transition={{ delay: 0.5 }} className="text-3xl font-serif mb-10 border-b elegant-border-b pb-4">
            Past <span className="italic text-[#1A1A1A]/40">Experiences</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {history.length > 0 ? (
              history.map((appt, index) => (
                <motion.div
                  key={appt._id}
                  {...fadeInUp}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-6 border elegant-border bg-transparent flex flex-col justify-between"
                >
                  <div className="mb-6">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/40 mb-2">
                      {new Date(appt.date).toLocaleDateString()}
                    </p>
                    <h3 className="text-xl font-serif text-[#1A1A1A] mb-1">{appt.service?.name}</h3>
                    <p className="text-[#1A1A1A]/60 font-sans text-[10px] tracking-widest uppercase">
                      Spec. {appt.stylist?.name}
                    </p>
                  </div>
                  <div className="font-sans text-[9px] uppercase tracking-widest text-[#DDA7A5] font-medium">
                    {appt.status}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-[#1A1A1A]/40 font-serif italic">No past records to display.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-[#FAF9F6]/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white border elegant-border p-10 md:p-14 w-full max-w-lg shadow-xl shadow-[#1A1A1A]/5 rounded-2xl">
            <h2 className="text-3xl font-serif mb-10 text-center">Refine <span className="italic text-[#DDA7A5]">Details</span></h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="elegant-input"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  className="elegant-input"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60">Phone Number</label>
                <input
                  type="text"
                  value={editForm.phone || ""}
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                  className="elegant-input"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60">New Password (Optional)</label>
                <input
                  type="password"
                  value={editForm.password}
                  onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                  className="elegant-input"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end mt-12 gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="font-sans text-xs uppercase tracking-widest px-6 py-4 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={handleProfileUpdate}
                className="elegant-button-filled px-10 py-4"
              >
                Save Refinements
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

export default DashboardPage