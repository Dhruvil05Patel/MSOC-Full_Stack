// src/pages/OwnerDashboard/Services/ServiceList.jsx
import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import toast from 'react-hot-toast'
import ServiceModal from './ServiceModal'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../../animations/motionVariants'

function ServiceList() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/services')
      setServices(res.data)
    } catch (err) {
      toast.error('Failed to fetch services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleEdit = (service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleDelete = (service) => {
    setSelectedService(service)
    setShowDeleteConfirm(true)
  }

  return (
    <motion.div {...fadeInUp} className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pink-600">Manage Services</h2>
        <button
          onClick={() => {
            setSelectedService(null)
            setShowModal(true)
          }}
          className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
        >
          + Add Service
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-pink-100 text-pink-800">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id} className="border-t">
                  <td className="p-4">{service.name}</td>
                  <td className="p-4">₹{service.price}</td>
                  <td className="p-4">{service.duration} mins</td>
                  <td className="p-4 space-x-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-full"
                      onClick={() => handleEdit(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full"
                      onClick={() => handleDelete(service)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <ServiceModal
          initialData={selectedService}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchServices()
            setShowModal(false)
          }}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDeleteModal
          name={selectedService?.name}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={async () => {
            try {
              await axios.delete(`/services/${selectedService._id}`)
              toast.success('Service deleted')
              fetchServices()
            } catch {
              toast.error('Failed to delete service')
            }
            setShowDeleteConfirm(false)
          }}
        />
      )}
    </motion.div>
  )
}

export default ServiceList