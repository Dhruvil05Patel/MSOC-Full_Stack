// src/pages/OwnerDashboard/Branches/BranchModal.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../../animations/motionVariants'
import { X } from 'lucide-react'
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'

function BranchModal({ initialData = {}, onClose, onSuccess }) {
  // If initialData is empty, it's an Add; otherwise, it's Edit
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [manager, setManager] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setAddress(initialData.address || '')
      setContact(initialData.contact || '')
      setManager(initialData.manager || '')
    }
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { name, address, contact, manager }

    try {
      if (initialData._id) {
        // Edit
        await axios.put(`/branches/${initialData._id}`, payload)
        toast.success('Branch updated successfully!')
      } else {
        // Add
        await axios.post('/branches', payload)
        toast.success('Branch added successfully!')
      }
      if (onSuccess) onSuccess()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save branch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-pink-100 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-white w-full max-w-md rounded-xl relative shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Modal Title */}
          <motion.h2 
            {...fadeInUp}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl font-bold mb-6 text-center text-pink-600"
          >
            {initialData._id ? 'Edit Branch' : 'Add New Branch'}
          </motion.h2>

          {/* Form */}
          <motion.form 
            {...fadeInUp}
            transition={{ delay: 0.7, duration: 0.8 }}
            onSubmit={handleSubmit} 
            className="space-y-5"
          >
            <div>
              <label className="block font-medium mb-1">Branch Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Contact</label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Manager Name</label>
              <input
                type="text"
                required
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-2 rounded-full font-semibold transition ${
                  loading
                    ? 'bg-pink-300 cursor-not-allowed'
                    : 'bg-pink-500 hover:bg-pink-600'
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  initialData._id ? 'Update Branch' : 'Add Branch'
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BranchModal