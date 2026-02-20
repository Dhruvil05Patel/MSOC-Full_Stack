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

  // Simulated images for services based on generic keywords
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
        <div className="flex justify-center items-center h-[80vh] bg-[#FAF9F6] text-[#1A1A1A]">
          <div className="text-xl font-sans font-light tracking-widest uppercase animate-pulse">Curating Services...</div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="bg-[#FAF9F6] min-h-screen py-16 md:py-24 px-6 md:px-16 text-[#1A1A1A]">

        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1A1A1A] leading-tight"
          >
            Curated <br /> <span className="italic text-[#DDA7A5]">Menu</span>
          </motion.h1>

          {/* Search Field */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full md:w-1/3"
          >
            <input
              type="text"
              placeholder="Search treatments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="elegant-input text-sm tracking-wide"
            />
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-6xl mx-auto flex flex-wrap gap-8 mb-20 border-b elegant-border-b pb-6"
        >
          <button
            onClick={() => setFilter('all')}
            className={`font-sans text-xs uppercase tracking-widest transition-colors ${filter === 'all'
              ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-medium'
              : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            All <span className="text-[10px] ml-1 opacity-60">[{services.length}]</span>
          </button>
          <button
            onClick={() => setFilter('female')}
            className={`font-sans text-xs uppercase tracking-widest transition-colors ${filter === 'female'
              ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-medium'
              : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            Her <span className="text-[10px] ml-1 opacity-60">[{femaleServices.length}]</span>
          </button>
          <button
            onClick={() => setFilter('male')}
            className={`font-sans text-xs uppercase tracking-widest transition-colors ${filter === 'male'
              ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-medium'
              : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            Him <span className="text-[10px] ml-1 opacity-60">[{maleServices.length}]</span>
          </button>
          <button
            onClick={() => setFilter('unisex')}
            className={`font-sans text-xs uppercase tracking-widest transition-colors ${filter === 'unisex'
              ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-medium'
              : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            Unisex <span className="text-[10px] ml-1 opacity-60">[{unisexServices.length}]</span>
          </button>
        </motion.div>

        {/* Services List/Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredServices.length > 0 ? (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  {...fadeInUp}
                  transition={{ delay: 0.5 + Math.min(index * 0.1, 0.5), duration: 0.8 }}
                  className="group flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="w-full md:w-48 h-64 md:h-64 relative overflow-hidden shrink-0">
                    <img
                      src={getServiceImage(service.name, service.category)}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="flex flex-col flex-1 h-full py-2">
                    <div className="flex justify-between items-start mb-4 gap-4 border-b elegant-border-b pb-4">
                      <h3 className="text-2xl font-serif text-[#1A1A1A]">{service.name}</h3>
                      <p className="font-sans font-light text-[#1A1A1A]">₹{service.price}</p>
                    </div>
                    <p className="text-[#1A1A1A]/70 font-sans font-light text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-[#1A1A1A]/40 font-sans text-xs uppercase tracking-widest">
                        {service.duration} mins • {service.category}
                      </span>

                      <button
                        onClick={() =>
                          user
                            ? navigate(`/appointments/new?serviceId=${service._id}`)
                            : navigate('/login')
                        }
                        className="font-sans text-xs uppercase tracking-widest font-medium hover:text-[#DDA7A5] transition-colors flex items-center gap-2"
                      >
                        Reserve <span>→</span>
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
              className="text-center py-24"
            >
              <p className="text-[#1A1A1A]/40 text-lg font-serif italic">No treatments match your refinement.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default ServicePage