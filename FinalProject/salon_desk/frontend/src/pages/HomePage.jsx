import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '../animations/motionVariants'
import PageWrapper from '../components/pageWrapper'
import { useUser } from '../context/UserContext'

function HomePage() {
  const navigate = useNavigate()
  const { user } = useUser()

  // Handler for Book Appointment button
  const handleBookAppointment = () => {
    if (user) {
      navigate('/appointment')
    } else {
      navigate('/register')
    }
  }

  return (
    <PageWrapper>
      <div className="text-gray-800">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-100 to-pink-200 py-24 text-center relative overflow-hidden">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4"
          >
            Welcome to <span className="text-pink-600">Éclat Beauty Lounge</span>
          </motion.h1>

          <motion.p
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-700 mb-8"
          >
            Where Radiance Meets Elegance ✨
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-4"
          >
            <button
              className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
            <Link to="/services">
              <button className="bg-white text-pink-600 border border-pink-500 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition">
                Explore Services
              </button>
            </Link>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto text-center">
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            About Us
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            At Éclat Beauty Lounge, we redefine luxury by blending elegance with expertise. 
            From professional hair styling to rejuvenating skin treatments and bridal makeovers, 
            our specialists craft every service with perfection. Your glow, our passion.
          </motion.p>
        </section>

        {/* Services Preview */}
        <section className="py-20 bg-gray-50">
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Our Popular Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
            {/* Hair Styling */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                💇‍♀️
              </div>
              <h3 className="text-xl font-bold mb-3">Hair Styling</h3>
              <p className="text-gray-600 mb-4">Trendy cuts, coloring, and styling crafted by our professionals.</p>
              <Link to="/services" className="text-pink-500 font-semibold hover:underline">Explore</Link>
            </motion.div>

            {/* Skin Treatments */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                🌸
              </div>
              <h3 className="text-xl font-bold mb-3">Skin Treatments</h3>
              <p className="text-gray-600 mb-4">Rejuvenating facials & therapies for glowing, healthy skin.</p>
              <Link to="/services" className="text-pink-500 font-semibold hover:underline">Explore</Link>
            </motion.div>

            {/* Bridal Makeovers */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                👰
              </div>
              <h3 className="text-xl font-bold mb-3">Bridal Makeovers</h3>
              <p className="text-gray-600 mb-4">Look radiant on your big day with our exclusive bridal packages.</p>
              <Link to="/services" className="text-pink-500 font-semibold hover:underline">Explore</Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-white">
          <motion.h2
            {...fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            What Our Clients Say 💕
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-gray-50 rounded-xl p-6 shadow">
              <p className="text-gray-600 italic">“Best salon experience ever! My hair looks amazing and the staff is so friendly.”</p>
              <h4 className="mt-4 font-bold text-pink-500">– Priya S.</h4>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="bg-gray-50 rounded-xl p-6 shadow">
              <p className="text-gray-600 italic">“The facial was heavenly, my skin feels brand new. Highly recommend Éclat!”</p>
              <h4 className="mt-4 font-bold text-pink-500">– Ananya D.</h4>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="bg-gray-50 rounded-xl p-6 shadow">
              <p className="text-gray-600 italic">“They made my wedding day extra special with a flawless bridal makeover.”</p>
              <h4 className="mt-4 font-bold text-pink-500">– Riya M.</h4>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-600 text-center text-white">
          <motion.h2 {...fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Glow with Éclat?
          </motion.h2>
          <button
            className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
            onClick={handleBookAppointment}
          >
            Book Your Appointment Today
          </button>
        </section>

        {/* Footer with Quick Links */}
        <footer className="bg-gray-900 text-gray-300 py-10 mt-0">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Éclat Beauty Lounge</h3>
              <p className="text-gray-400 text-sm">
                Enhancing your beauty with elegance and expertise. ✨
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-pink-400 transition">Home</Link></li>
                <li><Link to="/services" className="hover:text-pink-400 transition">Services</Link></li>
                <li><Link to="/appointment" className="hover:text-pink-400 transition">Book Appointment</Link></li>
                <li><Link to="/dashboard" className="hover:text-pink-400 transition">Client Dashboard</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <p className="text-gray-400 text-sm">📍 123 Elegance Street, Gandhinagar</p>
              <p className="text-gray-400 text-sm">📞 +91 12345 67890</p>
              <p className="text-gray-400 text-sm">✉️ support@eclatbeauty.com</p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-6">
            © 2025 Éclat Beauty Lounge. All rights reserved.
          </div>
        </footer>
      </div>
    </PageWrapper>
  )
}

export default HomePage