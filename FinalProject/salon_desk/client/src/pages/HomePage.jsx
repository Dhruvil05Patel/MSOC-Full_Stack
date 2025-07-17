import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn } from '../animations/motionVariants';
import PageWrapper from '../components/pageWrapper';

function HomePage() {
  return (
    <PageWrapper>
      <div className="text-gray-800">

        {/* Hero Section */}
        <section className="bg-pink-100 py-20 text-center">
          <motion.h1
            {...fadeInUp}
            className="text-5xl font-extrabold text-gray-900 mb-4"
          >
            Welcome to Éclat Beauty Lounge
          </motion.h1>

          <motion.p
            {...fadeIn}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-700 mb-8"
          >
            Where Radiance Meets Elegance.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/appointment">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition">
                Book an Appointment
              </button>
            </Link>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-16 px-8 max-w-5xl mx-auto text-center">
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl font-bold mb-6"
          >
            About Us
          </motion.h2>

          <motion.p
            {...fadeIn}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            At Éclat Beauty Lounge, we believe in enhancing your natural beauty while providing a luxurious and relaxing experience.
            Our expert stylists and therapists offer bespoke services tailored to your unique style and preference.
          </motion.p>
        </section>

        {/* Services Preview */}
        <section className="py-16 bg-gray-50">
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl font-bold text-center mb-10"
          >
            Our Popular Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {/* Service Card 1 */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-3">Hair Styling</h3>
              <p className="text-gray-600 mb-4">Trendy cuts, color, and styling crafted by our expert stylists.</p>
              <Link to="/services" className="text-pink-500 font-semibold hover:underline">Explore</Link>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-3">Skin Treatments</h3>
              <p className="text-gray-600 mb-4">Rejuvenate your skin with our luxurious facials and therapies.</p>
              <Link to="/services" className="text-pink-500 font-semibold hover:underline">Explore</Link>
            </motion.div>

            {/* Service Card 3 */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <h3 className="text-xl font-bold mb-3">Bridal Makeovers</h3>
              <p className="text-gray-600 mb-4">Look stunning on your special day with our bridal experts.</p>
              <Link to="/services" className="text-pink-500 font-semibold hover:underline">Explore</Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-12">
          © 2025 Éclat Beauty Lounge. All rights reserved.
        </footer>

      </div>
    </PageWrapper>
  );
}

export default HomePage;
