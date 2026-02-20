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
      toast.error('Failed to load sanctuaries')
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
    <motion.div {...fadeInUp} className="max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-end border-b elegant-border-b pb-6 mb-8 gap-6"
      >
        <div>
          <h2 className="text-3xl font-serif text-[#1A1A1A]">Manage <span className="italic text-[#DDA7A5]">Sanctuaries</span></h2>
        </div>
        <button
          className="elegant-button-filled px-6 py-3 text-xs"
          onClick={() => navigate('/dashboard/add-branch')}
        >
          Add Location
        </button>
      </motion.div>

      {/* Search Input */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="mb-8 max-w-md"
      >
        <input
          type="text"
          placeholder="Search locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="elegant-input"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4 }}
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
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Address</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Contact</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Manager</th>
                  <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((branch, index) => (
                  <motion.tr
                    key={branch._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border-b border-[#1A1A1A]/5 hover:bg-[#FAF9F6]/50 transition-colors"
                  >
                    <td className="p-5 font-serif text-lg text-[#1A1A1A]">{branch.name}</td>
                    <td className="p-5 text-sm font-light text-[#1A1A1A]/70">{branch.address}</td>
                    <td className="p-5 text-sm font-light text-[#1A1A1A]/70">{branch.contact}</td>
                    <td className="p-5 text-sm font-light text-[#1A1A1A]/70">{branch.manager}</td>
                    <td className="p-5 space-x-4">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-[#DDA7A5] hover:border-[#DDA7A5] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(branch)}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-[#1A1A1A]/40 font-serif italic text-sm">
                      No matching sanctuaries found.
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
              toast.success('Location excised')
              fetchBranches()
            } catch (err) {
              toast.error('Failed to excise')
            }
            setShowDeleteConfirm(false)
          }}
        />
      )}
    </motion.div>
  )
}

export default BranchList