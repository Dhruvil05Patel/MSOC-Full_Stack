// src/pages/OwnerDashboard/ConfirmDeleteModal.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../animations/motionVariants'

function ConfirmDeleteModal({ name, onClose, onConfirm }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-pink-100 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl"
      >
        <motion.h3 
          {...fadeInUp}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl font-bold mb-4 text-pink-600"
        >
          Confirm Delete
        </motion.h3>
        <motion.p 
          {...fadeInUp}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-gray-600 mb-6"
        >
          Are you sure you want to delete <span className="font-semibold text-pink-600">{name}</span>? 
          This action cannot be undone.
        </motion.p>
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex space-x-3"
        >
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-pink-500 hover:bg-pink-600 rounded-full text-white transition-colors duration-300 font-medium"
          >
            Delete
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ConfirmDeleteModal 