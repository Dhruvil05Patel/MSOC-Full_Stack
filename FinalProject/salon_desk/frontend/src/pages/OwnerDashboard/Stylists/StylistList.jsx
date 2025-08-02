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
  const [filter, setFilter] = useState('all') // all, male, female

  const fetchStylists = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/stylists')
      setStylists(res.data)
    } catch (err) {
      toast.error('Failed to load stylists')
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
    <motion.div {...fadeInUp} className="p-6">
      {/* Heading */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold text-pink-600">Manage Stylists</h2>
        <button
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300 font-medium"
          onClick={() => {
            setSelectedStylist(null)
            setShowModal(true)
          }}
        >
          + Add Stylist
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-pink-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-pink-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Stylists</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.male}</div>
          <div className="text-sm text-gray-600">Male Stylists</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.female}</div>
          <div className="text-sm text-gray-600">Female Stylists</div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Search stylists by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-colors duration-300 font-medium ${
              filter === 'all' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('male')}
            className={`px-4 py-2 rounded-full transition-colors duration-300 font-medium ${
              filter === 'male' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setFilter('female')}
            className={`px-4 py-2 rounded-full transition-colors duration-300 font-medium ${
              filter === 'female' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Female
          </button>
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
                  <th className="p-4 text-left font-semibold text-pink-700">Specialty</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Gender</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Branch</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Rating</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((stylist, index) => (
                  <motion.tr
                    key={stylist._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + index * 0.15, duration: 0.8 }}
                    className="border-t border-gray-100 hover:bg-pink-50 transition-colors duration-300"
                  >
                    <td className="p-4 font-medium">{stylist.name}</td>
                    <td className="p-4 text-gray-600">{stylist.specialty || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        stylist.gender === 'male' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {stylist.gender || 'N/A'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{stylist.branch?.name || 'N/A'}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span className="text-gray-600">{stylist.rating || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(stylist)}
                        className="text-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white transition-colors duration-300 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stylist)}
                        className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors duration-300 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      No stylists found
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
              toast.success('Stylist deleted')
              fetchStylists()
            } catch (err) {
              toast.error('Failed to delete stylist')
            }
            setShowDeleteConfirm(false)
          }}
        />
      )}
    </motion.div>
  )
}

export default StylistList