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
  const [filter, setFilter] = useState('all') // all, male, female, unisex
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/services')
      setServices(res.data)
    } catch {
      toast.error('Failed to load services')
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
    <motion.div {...fadeInUp} className="p-6">
      {/* Heading */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold text-pink-600">Manage Services</h2>
        <button
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300 font-medium"
          onClick={() => {
            setSelectedService(null)
            setShowModal(true)
          }}
        >
          + Add Service
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-pink-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-pink-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Services</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.male}</div>
          <div className="text-sm text-gray-600">For Him</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.female}</div>
          <div className="text-sm text-gray-600">For Her</div>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-600">{stats.unisex}</div>
          <div className="text-sm text-gray-600">Unisex</div>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Search services by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
        />
        <div className="flex space-x-2">
          {['all', 'male', 'female', 'unisex'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 font-medium ${
                filter === cat
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat === 'all'
                ? 'All'
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="overflow-x-auto"
      >
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-pink-100">
                  <th className="p-4 text-left font-semibold text-pink-700">Name</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Description</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Price</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Duration</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Category</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Branch</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((service, index) => (
                  <motion.tr
                    key={service._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + index * 0.15, duration: 0.8 }}
                    className="border-t border-gray-100 hover:bg-pink-50 transition-colors duration-300"
                  >
                    <td className="p-4 font-medium">{service.name}</td>
                    <td className="p-4 text-gray-600">
                      {service.description || 'N/A'}
                    </td>
                    <td className="p-4 text-pink-600 font-semibold">₹{service.price}</td>
                    <td className="p-4">{service.duration} mins</td>
                    <td className="p-4 capitalize">{service.category || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{service.branch?.name || 'N/A'}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedService(service)
                          setShowModal(true)
                        }}
                        className="text-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white transition-colors duration-300 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedService(service)
                          setShowDeleteConfirm(true)
                        }}
                        className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors duration-300 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-400">
                      No services found
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
              toast.success('Service deleted')
              fetchServices()
            } catch {
              toast.error('Failed to delete service')
            }
            setShowDeleteConfirm(false)
          }}
        />
      )}
    </motion.div>
  )
}

export default ServiceList