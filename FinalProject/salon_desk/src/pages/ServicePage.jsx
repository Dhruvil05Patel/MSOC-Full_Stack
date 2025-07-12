import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/pageWrapper'
import { fadeInUp } from '../animations/motionVariants'

function ServicePage() {
  const maleServices = [
    {
      name: "Men's Haircut",
      description: "Classic and trendy haircuts tailored to your style.",
      price: "₹499",
      duration: "30 mins",
    },
    {
      name: "Beard Styling",
      description: "Shape and groom your beard for a clean, sharp look.",
      price: "₹299",
      duration: "20 mins",
    },
    {
      name: "Men's Facial",
      description: "Deep cleansing and skin rejuvenation facial for men.",
      price: "₹799",
      duration: "40 mins",
    },
  ];

  const femaleServices = [
    {
      name: "Hair Spa",
      description: "Revitalize your hair with nourishing spa treatments.",
      price: "₹1199",
      duration: "60 mins",
    },
    {
      name: "Bridal Makeup",
      description: "Look radiant on your big day with our bridal experts.",
      price: "₹4999",
      duration: "120 mins",
    },
    {
      name: "Luxury Facial",
      description: "Glowing skin guaranteed with our signature facials.",
      price: "₹1499",
      duration: "60 mins",
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
          Our Services
        </motion.h1>

        {/* Male Services */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-pink-500 mb-6"
        >
          For Him
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {maleServices.map((service, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
              className="bg-white shadow-lg p-4 md:p-6 rounded-xl text-center"
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{service.name}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{service.description}</p>
              <div className="text-pink-500 font-semibold mb-1 md:mb-2">Price: {service.price}</div>
              <div className="text-gray-500 text-sm md:text-base">Duration: {service.duration}</div>
            </motion.div>
          ))}
        </div>

        {/* Female Services */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl md:text-3xl font-bold text-pink-500 mb-6"
        >
          For Her
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {femaleServices.map((service, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              className="bg-white shadow-lg p-4 md:p-6 rounded-xl text-center"
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{service.name}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{service.description}</p>
              <div className="text-pink-500 font-semibold mb-1 md:mb-2">Price: {service.price}</div>
              <div className="text-gray-500 text-sm md:text-base">Duration: {service.duration}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </PageWrapper>
  )
}

export default ServicePage
