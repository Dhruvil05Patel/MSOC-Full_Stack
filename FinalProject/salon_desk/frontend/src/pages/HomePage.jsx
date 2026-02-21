import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '../animations/motionVariants'
import PageWrapper from '../components/pageWrapper'
import { useUser } from '../context/UserContext'

function HomePage() {
  const navigate = useNavigate()
  const { user } = useUser()

  const handleBookAppointment = () => {
    if (user) {
      navigate('/appointment')
    } else {
      navigate('/login')
    }
  }

  return (
    <PageWrapper>
      <div className="bg-[#FAF9F6] text-[#1A1A1A] min-h-screen selection:bg-[#DDA7A5] selection:text-[#FAF9F6]">

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-16 overflow-hidden">
          <div className="absolute inset-0 z-0 flex justify-end">
            <div className="w-full md:w-3/5 h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10 hidden md:block"></div>
              <div className="absolute inset-0 bg-[#FAF9F6]/60 z-10 md:hidden"></div>
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Salon Interior"
                className="w-full h-full object-cover object-center opacity-80"
              />
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <motion.h1
              {...fadeInUp}
              className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#1A1A1A] leading-tight mb-8 max-w-4xl"
            >
              Artistry in <br />
              <span className="italic text-[#DDA7A5]">every detail.</span>
            </motion.h1>

            <motion.p
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl font-sans font-light text-[#1A1A1A]/80 mb-12 max-w-md leading-relaxed"
            >
              Experience a sanctuary of elevated beauty and refined aesthetics. Tailored for the modern muse.
            </motion.p>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button
                className="elegant-button-filled"
                onClick={handleBookAppointment}
              >
                Reserve a Time
              </button>
              <Link to="/services">
                <button className="elegant-button w-full sm:w-auto text-center">
                  Discover Services
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 px-6 md:px-16 max-w-5xl mx-auto text-center">
          <motion.h2
            {...fadeInUp}
            className="text-3xl md:text-5xl font-serif italic text-[#DDA7A5] mb-8"
          >
            The Philosophy
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl font-serif text-[#1A1A1A] leading-relaxed"
          >
            "We believe that true beauty stems from mindful care and exquisite technique. Our approach strips away the unnecessary, leaving only pure, radiant elegance."
          </motion.p>
        </section>

        {/* Services Showcase */}
        <section className="py-24 px-6 md:px-16 bg-[#F0EDE5]">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              {...fadeInUp}
              className="text-4xl md:text-6xl font-serif mb-16 text-center"
            >
              Curated <span className="italic text-[#DDA7A5]">Experiences</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Hair Architecture */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="flex flex-col group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[4/5] mb-8 relative">
                  <div className="absolute inset-0 bg-[#DDA7A5]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Styling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Hair Architecture</h3>
                <p className="text-[#1A1A1A]/70 font-sans font-light text-sm leading-relaxed mb-6">Expert shaping, texturizing, and color mastery tailored to enhance your natural bone structure.</p>
                <Link to="/services" className="font-sans font-medium text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-[#DDA7A5] transition-colors mt-auto">
                  View Treatments <span>→</span>
                </Link>
              </motion.div>

              {/* Botanical Skincare */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.4 }}
                className="flex flex-col group cursor-pointer pt-0 md:pt-16"
              >
                <div className="overflow-hidden aspect-[4/5] mb-8 relative">
                  <div className="absolute inset-0 bg-[#DDA7A5]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img src="/Botanical_Radiance.jpg" alt="Skincare" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Botanical Radiance</h3>
                <p className="text-[#1A1A1A]/70 font-sans font-light text-sm leading-relaxed mb-6">Rejuvenating organic facials and therapies designed to restore your skin's innate luminosity.</p>
                <Link to="/services" className="font-sans font-medium text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-[#DDA7A5] transition-colors mt-auto">
                  View Treatments <span>→</span>
                </Link>
              </motion.div>

              {/* Ritual Aesthetics */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.6 }}
                className="flex flex-col group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[4/5] mb-8 relative">
                  <div className="absolute inset-0 bg-[#DDA7A5]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Makeup & Brows" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Ritual Aesthetics</h3>
                <p className="text-[#1A1A1A]/70 font-sans font-light text-sm leading-relaxed mb-6">Flawless makeup application, brow sculpting, and elegant finishing for your most important moments.</p>
                <Link to="/services" className="font-sans font-medium text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-[#DDA7A5] transition-colors mt-auto">
                  View Treatments <span>→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-16 text-center">
          <motion.h2 {...fadeInUp} className="text-5xl md:text-7xl font-serif text-[#1A1A1A] mb-12">
            Ready for your <span className="italic text-[#DDA7A5]">transformation?</span>
          </motion.h2>
          <button
            className="elegant-button-filled px-16 py-5 text-sm md:text-base"
            onClick={handleBookAppointment}
          >
            Request an Appointment
          </button>
        </section>

        {/* Footer */}
        <footer className="bg-[#1A1A1A] text-[#FAF9F6] pt-24 pb-12 px-6 md:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

            <div className="md:col-span-5">
              <h3 className="text-4xl md:text-5xl font-serif tracking-wide mb-6">
                Éclat <span className="italic text-[#DDA7A5]">Salon</span>
              </h3>
              <p className="font-sans font-light text-sm text-[#FAF9F6]/60 max-w-xs leading-relaxed">
                Elevating personal aesthetics through mindful technique and premium care.
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <h4 className="font-sans font-medium uppercase tracking-widest text-[#FAF9F6]/40 mb-8 text-xs">Explore</h4>
              <ul className="space-y-4 font-sans font-light text-sm">
                <li><Link to="/" className="hover:text-[#DDA7A5] transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-[#DDA7A5] transition-colors">Services</Link></li>
                <li><Link to="/stylist" className="hover:text-[#DDA7A5] transition-colors">Stylists</Link></li>
                <li><Link to="/appointment" className="hover:text-[#DDA7A5] transition-colors">Reserve</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-sans font-medium uppercase tracking-widest text-[#FAF9F6]/40 mb-8 text-xs">Visit Us</h4>
              <ul className="space-y-4 font-sans font-light text-sm text-[#FAF9F6]/80">
                <li>123 Elegance Boulevard<br />Suite 400</li>
                <li>+1 (555) 123-4567</li>
                <li className="text-[#DDA7A5]">hello@eclatsalon.com</li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#FAF9F6]/40 font-sans font-medium uppercase tracking-widest text-[10px] border-t border-[#FAF9F6]/10 pt-8">
            <p>© 2026 ÉCLAT SALON. ALL RIGHTS RESERVED.</p>
            <p className="mt-4 md:mt-0">ELEGANT MINIMAL DESIGN.</p>
          </div>
        </footer>
      </div>
    </PageWrapper>
  )
}

export default HomePage