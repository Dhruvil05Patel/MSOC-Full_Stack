import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'

function StylistPage() {
  const maleStylists = [
    {
      name: "Raj Malhotra",
      specialty: "Haircuts & Beard Styling",
      rating: 4.8,
    },
    {
      name: "Rohan Mehta",
      specialty: "Men's Hair Spa",
      rating: 4.6,
    },
  ];

  const femaleStylists = [
    {
      name: "Priya Sharma",
      specialty: "Bridal Makeup",
      rating: 4.9,
    },
    {
      name: "Ananya Desai",
      specialty: "Luxury Facial & Hair Spa",
      rating: 4.7,
    },
  ];

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Main Heading */}
        <motion.h1
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          Our Stylists
        </motion.h1>

        {/* Male Stylists */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-pink-500 mb-6"
        >
          For Him
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {maleStylists.map((stylist, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
              className="bg-white shadow-lg p-4 md:p-6 rounded-xl text-center"
            >
              <div className="w-24 h-24 mx-auto bg-pink-100 rounded-full mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-1">{stylist.name}</h3>
              <p className="text-gray-600 mb-2">{stylist.specialty}</p>
              <div className="text-yellow-500 font-semibold">⭐ {stylist.rating}</div>
            </motion.div>
          ))}
        </div>

        {/* Female Stylists */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-pink-500 mb-6"
        >
          For Her
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {femaleStylists.map((stylist, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              className="bg-white shadow-lg p-4 md:p-6 rounded-xl text-center"
            >
              <div className="w-24 h-24 mx-auto bg-pink-100 rounded-full mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-1">{stylist.name}</h3>
              <p className="text-gray-600 mb-2">{stylist.specialty}</p>
              <div className="text-yellow-500 font-semibold">⭐ {stylist.rating}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </PageWrapper>
  )
}

export default StylistPage
