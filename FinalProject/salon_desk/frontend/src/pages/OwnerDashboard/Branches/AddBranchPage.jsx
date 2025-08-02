import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../../components/pageWrapper'
import toast from 'react-hot-toast'
import axios from '../../../utils/axios'

function AddBranchPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    manager: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post('/branches', formData)
      toast.success('Branch added successfully!')
      navigate('/dashboard') // Navigate back to dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add branch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto py-10 px-4 md:px-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-pink-600">
            Add New Branch
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="block font-medium mb-1">Branch Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              required
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Manager Name</label>
            <input
              type="text"
              name="manager"
              required
              value={formData.manager}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
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
              {loading ? 'Adding...' : 'Add Branch'}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  )
}

export default AddBranchPage