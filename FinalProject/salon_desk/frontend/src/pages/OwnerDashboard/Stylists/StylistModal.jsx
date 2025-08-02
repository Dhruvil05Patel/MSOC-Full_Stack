// src/pages/OwnerDashboard/Stylists/StylistModal.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../../animations/motionVariants'
import { X } from 'lucide-react'
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'

function StylistModal({ initialData, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    gender: '',
    branch: '',
    rating: '',
    experience: '',
    bio: ''
  })
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        specialty: initialData.specialty || '',
        gender: initialData.gender || '',
        branch: initialData.branch || '',
        rating: initialData.rating || '',
        experience: initialData.experience || '',
        bio: initialData.bio || ''
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
        await axios.put(`/stylists/${initialData._id}`, form)
        toast.success('Stylist updated successfully!')
      } else {
        await axios.post('/stylists', form)
        toast.success('Stylist added successfully!')
      }
      onSuccess()
    } catch (err) {
      toast.error('Failed to save stylist')
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
            {initialData ? 'Edit Stylist' : 'Add New Stylist'}
          </motion.h2>

          {/* Form */}
          <motion.form 
            {...fadeInUp}
            transition={{ delay: 0.7, duration: 0.8 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Specialty</label>
              <input
                name="specialty"
                type="text"
                value={form.specialty}
                onChange={handleChange}
                placeholder="e.g., Haircuts, Bridal Makeup, Facial"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Branch</label>
                <select
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Experience (Years)</label>
                <input
                  name="experience"
                  type="number"
                  min="0"
                  max="50"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Rating</label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                placeholder="4.5"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="3"
                placeholder="Tell us about the stylist's background and expertise..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex space-x-3 pt-4"
            >
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-300 font-medium"
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
                  initialData ? 'Update Stylist' : 'Add Stylist'
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StylistModal
