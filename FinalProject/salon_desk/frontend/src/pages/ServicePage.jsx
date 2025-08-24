// src/pages/ServicePage.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import axios from '../utils/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ServicePage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, male, female, unisex
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/services')
      setServices(res.data)
    } catch (err) {
      console.error('Failed to fetch services:', err)
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const maleServices = services.filter(service => service.category === 'male')
  const femaleServices = services.filter(service => service.category === 'female')
  const unisexServices = services.filter(service => service.category === 'unisex')

  const filteredServices = services.filter(service => {
    const matchesFilter =
      filter === 'all' || service.category === filter
    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.description?.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getCategoryColor = (category) => {
    if (category === 'male') return 'bg-blue-100 text-blue-600'
    if (category === 'female') return 'bg-purple-100 text-purple-600'
    return 'bg-green-100 text-green-600'
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h1
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          Our Services
        </motion.h1>

        {/* Search Field */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-xl mx-auto mb-6"
        >
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center space-x-3 mb-10"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium ${
              filter === 'all'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({services.length})
          </button>
          <button
            onClick={() => setFilter('male')}
            className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium ${
              filter === 'male'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            For Him ({maleServices.length})
          </button>
          <button
            onClick={() => setFilter('female')}
            className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium ${
              filter === 'female'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            For Her ({femaleServices.length})
          </button>
          <button
            onClick={() => setFilter('unisex')}
            className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium ${
              filter === 'unisex'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Unisex ({unisexServices.length})
          </button>
        </motion.div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                {...fadeInUp}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <h3 className="text-lg md:text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-3 flex-1">{service.description}</p>
                <div className="mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                    {service.category === 'male'
                      ? 'For Him'
                      : service.category === 'female'
                      ? 'For Her'
                      : 'Unisex'}
                  </span>
                </div>
                <p className="text-pink-500 font-semibold mb-1">₹{service.price}</p>
                <p className="text-gray-500 text-sm">Duration: {service.duration} mins</p>
                {/* Book Now Button */}
                <button
                  onClick={() => navigate(`/appointments/new?serviceId=${service._id}`)}
                  className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors duration-300 font-medium"
                >
                  Book Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No services found for this category.</p>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  )
}

export default ServicePage