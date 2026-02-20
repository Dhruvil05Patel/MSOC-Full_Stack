// src/pages/OwnerDashboard/Stylists/StylistList.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../../animations/motionVariants'
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'
import StylistModal from './StylistModal'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

function StylistList() {
  const [stylists, setStylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedStylist, setSelectedStylist] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [filter, setFilter] = useState('all')

  const fetchStylists = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/stylists')
      setStylists(res.data)
    } catch (err) {
      toast.error('Failed to load specialists')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStylists()
  }, [])

  const handleEdit = (stylist) => {
    setSelectedStylist(stylist)
    setShowModal(true)
  }

  const handleDelete = (stylist) => {
    setSelectedStylist(stylist)
    setShowDeleteConfirm(true)
  }

  const filtered = stylists.filter(stylist => {
    const matchesSearch = stylist.name.toLowerCase().includes(search.toLowerCase()) ||
      stylist.specialty?.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || stylist.gender === filter
    return matchesSearch && matchesFilter
  })

  const getStylistStats = () => {
    const total = stylists.length
    const male = stylists.filter(s => s.gender === 'male').length
    const female = stylists.filter(s => s.gender === 'female').length
    return { total, male, female }
  }

  const stats = getStylistStats()

  return (
    <motion.div {...fadeInUp} className="max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-end border-b elegant-border-b pb-6 mb-8 gap-6"
      >
        <div>
          <h2 className="text-3xl font-serif text-[#1A1A1A]">Manage <span className="italic text-[#DDA7A5]">Specialists</span></h2>
        </div>
        <button
          className="elegant-button-filled px-6 py-3 text-xs"
          onClick={() => {
            setSelectedStylist(null)
            setShowModal(true)
          }}
        >
          Add Specialist
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-6 text-center shadow-sm">
          <div className="text-2xl font-serif text-[#1A1A1A] mb-1">{stats.total}</div>
          <div className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Total Directory</div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-6 text-center shadow-sm">
          <div className="text-2xl font-serif text-[#1A1A1A] mb-1">{stats.male}</div>
          <div className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Male Specs.</div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-6 text-center shadow-sm">
          <div className="text-2xl font-serif text-[#1A1A1A] mb-1">{stats.female}</div>
          <div className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Female Specs.</div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="mb-8 space-y-6"
      >
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="elegant-input max-w-md"
        />
        <div className="flex space-x-6 border-b elegant-border-b pb-4">
          <button
            onClick={() => setFilter('all')}
            className={`font-sans text-[10px] tracking-widest uppercase transition-colors ${filter === 'all'
                ? 'text-[#1A1A1A] font-medium border-b border-[#1A1A1A] pb-1'
                : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('male')}
            className={`font-sans text-[10px] tracking-widest uppercase transition-colors ${filter === 'male'
                ? 'text-[#1A1A1A] font-medium border-b border-[#1A1A1A] pb-1'
                : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            Male
          </button>
          <button
            onClick={() => setFilter('female')}
            className={`font-sans text-[10px] tracking-widest uppercase transition-colors ${filter === 'female'
                ? 'text-[#1A1A1A] font-medium border-b border-[#1A1A1A] pb-1'
                : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            Female
          </button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.5 }}
        className="overflow-x-auto"
      >
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-sm font-sans font-light tracking-widest uppercase text-[#1A1A1A]/40 animate-pulse">Loading directory...</div>
          </div>
        ) : (
          <div className="bg-white/50 backdrop-blur-sm border elegant-border">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAF9F6] border-b elegant-border-b">
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Name</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Specialty</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Gender</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Branch</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Rating</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((stylist, index) => (
                  <motion.tr
                    key={stylist._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-[#1A1A1A]/5 hover:bg-[#FAF9F6]/50 transition-colors"
                  >
                    <td className="p-5 font-serif text-lg text-[#1A1A1A]">{stylist.name}</td>
                    <td className="p-5 text-xs text-[#1A1A1A]/70">{stylist.specialty || 'N/A'}</td>
                    <td className="p-5">
                      <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">
                        {stylist.gender || 'N/A'}
                      </span>
                    </td>
                    <td className="p-5 text-xs text-[#1A1A1A]/70">{stylist.branch?.name || 'N/A'}</td>
                    <td className="p-5">
                      <div className="flex items-center text-xs text-[#1A1A1A]/70">
                        <span className="text-[#DDA7A5] mr-1">★</span>
                        <span>{stylist.rating || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-5 space-x-4">
                      <button
                        onClick={() => handleEdit(stylist)}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-[#DDA7A5] hover:border-[#DDA7A5] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stylist)}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <td colSpan="6" className="p-10 text-center text-[#1A1A1A]/40 font-serif italic text-sm">
                      No matching specialists found
                    </td>
                  </motion.tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      {showModal && (
        <StylistModal
          initialData={selectedStylist}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchStylists()
            setShowModal(false)
          }}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          name={selectedStylist?.name}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={async () => {
            try {
              await axios.delete(`/stylists/${selectedStylist._id}`)
              toast.success('Specialist excised')
              fetchStylists()
            } catch (err) {
              toast.error('Failed to excise specialist')
            }
            setShowDeleteConfirm(false)
          }}
        />
      )}
    </motion.div>
  )
}

export default StylistList