// src/pages/OwnerDashboard/Branches/BranchList.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../../animations/motionVariants'
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'
import BranchModal from './BranchModal'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

function BranchList() {
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const navigate = useNavigate()

  const fetchBranches = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/branches')
      setBranches(res.data)
    } catch (err) {
      toast.error('Failed to load branches')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  const handleEdit = (branch) => {
    setSelectedBranch(branch)
    setShowModal(true)
  }

  const handleDelete = (branch) => {
    setSelectedBranch(branch)
    setShowDeleteConfirm(true)
  }

  const filtered = branches.filter(branch =>
    branch.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div {...fadeInUp} className="p-6">
      {/* Heading */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold text-pink-600">Manage Branches</h2>
        <button
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300 font-medium"
          onClick={() => navigate('/dashboard/add-branch')}
        >
          + Add Branch
        </button>
      </motion.div>

      {/* Search Input */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search branches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.6, duration: 0.8 }}
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
                  <th className="p-4 text-left font-semibold text-pink-700">Address</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Contact</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Manager</th>
                  <th className="p-4 text-left font-semibold text-pink-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((branch, index) => (
                  <motion.tr
                    key={branch._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.15, duration: 0.6 }}
                    className="border-t border-gray-100 hover:bg-pink-50 transition-colors duration-300"
                  >
                    <td className="p-4 font-medium">{branch.name}</td>
                    <td className="p-4 text-gray-600">{branch.address}</td>
                    <td className="p-4 text-gray-600">{branch.contact}</td>
                    <td className="p-4 text-gray-600">{branch.manager}</td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="text-sm px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(branch)}
                        className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition"
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
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      No branches found
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
        <BranchModal
          initialData={selectedBranch}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchBranches()
            setShowModal(false)
          }}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          name={selectedBranch?.name}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={async () => {
            try {
              await axios.delete(`/branches/${selectedBranch._id}`)
              toast.success('Branch deleted')
              fetchBranches()
            } catch (err) {
              toast.error('Failed to delete')
            }
            setShowDeleteConfirm(false)
          }}
        />
      )}
    </motion.div>
  )
}

export default BranchList