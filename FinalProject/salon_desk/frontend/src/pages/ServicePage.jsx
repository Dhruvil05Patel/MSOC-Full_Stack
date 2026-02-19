// src/pages/ServicePage.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'
import axios from '../utils/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function ServicePage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, male, female, unisex
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { user } = useUser()

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
    const matchesFilter = filter === 'all' || service.category === filter
    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.description?.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Simulated images for services based on generic keywords since we couldn't generate them
  const getServiceImage = (name, category) => {
    const query = name.toLowerCase().includes('color') ? 'hair color'
      : name.toLowerCase().includes('cut') ? 'haircut styling'
        : category === 'male' ? 'barber fade'
          : 'salon treatment';
    return `https://images.unsplash.com/photo-1562322140-8baeececf3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`;
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-[80vh] bg-[#121212] text-[#F4F4F5]">
          <div className="text-2xl font-black uppercase tracking-widest animate-pulse">Loading Services...</div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="bg-[#121212] min-h-screen py-16 md:py-24 px-4 md:px-8 text-[#F4F4F5]">

        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.h1
            {...fadeInUp}
            className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none"
          >
            The <br /> <span className="text-[#E63946]">Menu.</span>
          </motion.h1>

          {/* Search Field */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full md:w-1/3"
          >
            <input
              type="text"
              placeholder="SEARCH SERVICES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent brutalist-border-b border-[#27272A] focus:border-[#E63946] py-4 text-[#F4F4F5] font-bold uppercase tracking-widest outline-none placeholder-[#27272A] transition-colors"
            />
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-7xl mx-auto flex flex-wrap gap-4 mb-20"
        >
          <button
            onClick={() => setFilter('all')}
            className={`brutalist-pill px-8 py-3 font-bold uppercase tracking-widest transition-colors ${filter === 'all'
                ? 'bg-[#E63946] text-[#F4F4F5] border-[#E63946]'
                : 'bg-transparent text-[#a1a1aa] hover:border-[#F4F4F5] hover:text-[#F4F4F5]'
              }`}
          >
            All [{services.length}]
          </button>
          <button
            onClick={() => setFilter('male')}
            className={`brutalist-pill px-8 py-3 font-bold uppercase tracking-widest transition-colors ${filter === 'male'
                ? 'bg-[#E63946] text-[#F4F4F5] border-[#E63946]'
                : 'bg-transparent text-[#a1a1aa] hover:border-[#F4F4F5] hover:text-[#F4F4F5]'
              }`}
          >
            Him [{maleServices.length}]
          </button>
          <button
            onClick={() => setFilter('female')}
            className={`brutalist-pill px-8 py-3 font-bold uppercase tracking-widest transition-colors ${filter === 'female'
                ? 'bg-[#E63946] text-[#F4F4F5] border-[#E63946]'
                : 'bg-transparent text-[#a1a1aa] hover:border-[#F4F4F5] hover:text-[#F4F4F5]'
              }`}
          >
            Her [{femaleServices.length}]
          </button>
          <button
            onClick={() => setFilter('unisex')}
            className={`brutalist-pill px-8 py-3 font-bold uppercase tracking-widest transition-colors ${filter === 'unisex'
                ? 'bg-[#E63946] text-[#F4F4F5] border-[#E63946]'
                : 'bg-transparent text-[#a1a1aa] hover:border-[#F4F4F5] hover:text-[#F4F4F5]'
              }`}
          >
            Unisex [{unisexServices.length}]
          </button>
        </motion.div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredServices.length > 0 ? (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  {...fadeInUp}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="group flex flex-col relative bg-[#1C1C1C] brutalist-border overflow-hidden"
                >
                  <div className="w-full h-80 bg-[#121212] relative overflow-hidden brutalist-border-b">
                    <img
                      src={getServiceImage(service.name, service.category)}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="brutalist-pill bg-[#121212]/80 backdrop-blur border-none px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#F4F4F5]">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-6 gap-4">
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">{service.name}</h3>
                      <p className="text-2xl font-black text-[#E63946]">₹{service.price}</p>
                    </div>
                    <p className="text-[#a1a1aa] font-medium mb-8 flex-1 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-8 brutalist-border-t border-[#27272A]">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#a1a1aa]">{service.duration} MINS</p>

                      <button
                        onClick={() =>
                          user
                            ? navigate(`/appointments/new?serviceId=${service._id}`)
                            : navigate('/login')
                        }
                        className="brutalist-pill px-8 py-3 bg-transparent text-[#F4F4F5] font-bold hover:bg-[#E63946] hover:border-[#E63946] transition-colors uppercase tracking-widest text-sm"
                      >
                        BOOK
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center py-24 brutalist-border bg-[#1C1C1C]"
            >
              <p className="text-[#a1a1aa] text-2xl font-black uppercase tracking-widest">No services match your criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ServicePage