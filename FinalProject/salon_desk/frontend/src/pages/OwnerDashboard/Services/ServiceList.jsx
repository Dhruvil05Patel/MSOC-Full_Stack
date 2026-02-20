// src/pages/OwnerDashboard/Services/ServiceList.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../../animations/motionVariants'
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'
import ServiceModal from './ServiceModal'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

function ServiceList() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/services')
      setServices(res.data)
    } catch {
      toast.error('Failed to load treatments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const filtered = services.filter(service => {
    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.description?.toLowerCase().includes(search.toLowerCase())

    const matchesFilter = filter === 'all' || service.category === filter
    return matchesSearch && matchesFilter
  })

  const getServiceStats = () => {
    const total = services.length
    const male = services.filter(s => s.category === 'male').length
    const female = services.filter(s => s.category === 'female').length
    const unisex = services.filter(s => s.category === 'unisex').length
    return { total, male, female, unisex }
  }

  const stats = getServiceStats()

  return (
    <motion.div {...fadeInUp} className="max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-end border-b elegant-border-b pb-6 mb-8 gap-6"
      >
        <div>
          <h2 className="text-3xl font-serif text-[#1A1A1A]">Manage <span className="italic text-[#DDA7A5]">Treatments</span></h2>
        </div>
        <button
          className="elegant-button-filled px-6 py-3 text-xs"
          onClick={() => {
            setSelectedService(null)
            setShowModal(true)
          }}
        >
          Add Treatment
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-6 text-center shadow-sm">
          <div className="text-2xl font-serif text-[#1A1A1A] mb-1">{stats.total}</div>
          <div className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Total</div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-6 text-center shadow-sm">
          <div className="text-2xl font-serif text-[#1A1A1A] mb-1">{stats.male}</div>
          <div className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60 font-medium">For Him</div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-6 text-center shadow-sm">
          <div className="text-2xl font-serif text-[#1A1A1A] mb-1">{stats.female}</div>
          <div className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60 font-medium">For Her</div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm border elegant-border p-6 text-center shadow-sm">
          <div className="text-2xl font-serif text-[#1A1A1A] mb-1">{stats.unisex}</div>
          <div className="text-[10px] font-sans tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Unisex</div>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="mb-8 space-y-6"
      >
        <input
          type="text"
          placeholder="Search treatments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="elegant-input max-w-md"
        />
        <div className="flex space-x-6 border-b elegant-border-b pb-4">
          {['all', 'male', 'female', 'unisex'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-sans text-[10px] tracking-widest uppercase transition-colors ${filter === cat
                  ? 'text-[#1A1A1A] font-medium border-b border-[#1A1A1A] pb-1'
                  : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
                }`}
            >
              {cat === 'all'
                ? 'All'
                : cat}
            </button>
          ))}
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
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Description</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Price</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Duration</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Category</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Branch</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((service, index) => (
                  <motion.tr
                    key={service._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-b border-[#1A1A1A]/5 hover:bg-[#FAF9F6]/50 transition-colors"
                  >
                    <td className="p-5 font-serif text-lg text-[#1A1A1A]">{service.name}</td>
                    <td className="p-5 text-xs font-light text-[#1A1A1A]/70 max-w-xs">{service.description || 'N/A'}</td>
                    <td className="p-5 text-sm font-medium text-[#DDA7A5]">₹{service.price}</td>
                    <td className="p-5 text-xs text-[#1A1A1A]/70">{service.duration} mins</td>
                    <td className="p-5 text-[10px] uppercase tracking-widest text-[#1A1A1A]/50">{service.category || 'N/A'}</td>
                    <td className="p-5 text-xs text-[#1A1A1A]/70">{service.branch?.name || 'N/A'}</td>
                    <td className="p-5 space-x-4">
                      <button
                        onClick={() => {
                          setSelectedService(service)
                          setShowModal(true)
                        }}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-[#DDA7A5] hover:border-[#DDA7A5] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedService(service)
                          setShowDeleteConfirm(true)
                        }}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-10 text-center text-[#1A1A1A]/40 font-serif italic text-sm">
                      No matching treatments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      {showModal && (
        <ServiceModal
          initialData={selectedService}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchServices()
            setShowModal(false)
          }}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          name={selectedService?.name}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={async () => {
            try {
              await axios.delete(`/services/${selectedService._id}`)
              toast.success('Treatment excised')
              fetchServices()
            } catch {
              toast.error('Failed to excise treatment')
            }
            setShowDeleteConfirm(false)
          }}
        />
      )}
    </motion.div>
  )
}

export default ServiceList