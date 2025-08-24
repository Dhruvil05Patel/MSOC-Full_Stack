// src/pages/OwnerDashboard/Services/ServiceModal.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../../animations/motionVariants'
import { X } from 'lucide-react'
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'

function ServiceModal({ initialData, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    branch: ''
  })
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        duration: initialData.duration || '',
        category: initialData.category || '',
        branch: initialData.branch || ''
      })
    }
  }, [initialData])

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get('/branches')
        setBranches(res.data)
      } catch {
        toast.error('Failed to load branches')
      }
    }
    fetchBranches()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (initialData) {
        await axios.put(`/services/${initialData._id}`, form)
        toast.success('Service updated successfully!')
      } else {
        await axios.post('/services', form)
        toast.success('Service added successfully!')
      }
      onSuccess()
    } catch (err) {
      toast.error('Failed to save service')
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
        className="bg-white w-full max-w-lg rounded-xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl font-bold mb-6 text-center text-pink-600"
          >
            {initialData ? 'Edit Service' : 'Add New Service'}
          </motion.h2>

          <motion.form
            {...fadeInUp}
            transition={{ delay: 0.7, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Service Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Price (INR)</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Duration (mins)</label>
                <input
                  name="duration"
                  type="number"
                  min="0"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div>
  <label className="block font-semibold mb-2 text-gray-700">Category</label>
  <select
    name="category"
    value={form.category}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
  >
    <option value="">Select Category</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="unisex">Unisex</option>
  </select>
</div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Branch</label>
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex space-x-3 pt-4"
            >
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-full font-semibold transition-all duration-300 ${
                  loading
                    ? 'bg-pink-300 cursor-not-allowed'
                    : 'bg-pink-500 hover:bg-pink-600 hover:shadow-lg'
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  initialData ? 'Update Service' : 'Add Service'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ServiceModal