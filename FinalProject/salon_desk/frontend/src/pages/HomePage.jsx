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
      <div className="bg-[#121212] text-[#F4F4F5] min-h-screen selection:bg-[#E63946] selection:text-[#F4F4F5]">

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-12 border-b border-[#27272A] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#121212]/80 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1521590832168-60cc2ec46101?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Salon Interior"
              className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <motion.h1
              {...fadeInUp}
              className="text-7xl md:text-[10rem] lg:text-[12rem] font-black uppercase tracking-tighter leading-none mb-6"
            >
              Raw <br /> <span className="text-[#E63946]">Beauty.</span>
            </motion.h1>

            <motion.p
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-3xl font-bold uppercase tracking-widest text-[#a1a1aa] mb-12 max-w-2xl"
            >
              The Modern Standard for Editorial Grooming and Styling.
            </motion.p>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button
                className="brutalist-pill bg-[#F4F4F5] text-[#121212] px-12 py-5 font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-[#E63946] hover:text-[#F4F4F5] hover:border-[#E63946] transition-colors"
                onClick={handleBookAppointment}
              >
                Secure Slot
              </button>
              <Link to="/services">
                <button className="brutalist-pill bg-transparent text-[#F4F4F5] px-12 py-5 font-black text-xl md:text-2xl uppercase tracking-widest hover:bg-[#F4F4F5] hover:text-[#121212] transition-colors w-full sm:w-auto text-center">
                  The Menu
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Marquee or Manifest text */}
        <section className="py-8 brutalist-border-b bg-[#E63946] text-[#F4F4F5] overflow-hidden whitespace-nowrap flex items-center">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="text-3xl md:text-5xl font-black uppercase tracking-widest flex gap-8"
          >
            <span>NO COMPROMISE.</span> <span>PURE AESTHETICS.</span> <span>MODERN BRUTALISM.</span> <span>ELEVATED EXPERIENCE.</span>
            <span>NO COMPROMISE.</span> <span>PURE AESTHETICS.</span> <span>MODERN BRUTALISM.</span> <span>ELEVATED EXPERIENCE.</span>
          </motion.div>
        </section>

        {/* About / Philosophy Section */}
        <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto border-b border-[#27272A]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2
                {...fadeInUp}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8"
              >
                <span className="text-[#E63946]">01.</span> <br /> The Ethos
              </motion.h2>
            </div>
            <div>
              <motion.p
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-4xl font-bold text-[#a1a1aa] leading-tight uppercase tracking-tight"
              >
                We strip away the excess. <br />
                <span className="text-[#F4F4F5]">What remains is pure technique, premium structure, and uncompromising quality.</span> Your image, distilled.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services Preview Grid */}
        <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto border-b border-[#27272A]">
          <motion.h2
            {...fadeInUp}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16"
          >
            <span className="text-[#a1a1aa]">02.</span> <br /> Disciplines
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Structural Cuts */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-[#1C1C1C] brutalist-border p-10 flex flex-col group hover:bg-[#F4F4F5] transition-colors duration-500 hover:text-[#121212]"
            >
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">Structural <br /> Cuts</h3>
              <p className="text-[#a1a1aa] font-bold uppercase tracking-widest mb-12 flex-1 group-hover:text-[#27272A]">Precision shaping and brutal efficiency. The architecture of modern hair.</p>
              <Link to="/services" className="font-black uppercase tracking-widest flex items-center gap-4 text-[#E63946]">
                Explore <span>→</span>
              </Link>
            </motion.div>

            {/* Technical Color */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="bg-[#1C1C1C] brutalist-border p-10 flex flex-col group hover:bg-[#F4F4F5] transition-colors duration-500 hover:text-[#121212]"
            >
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">Technical <br /> Color</h3>
              <p className="text-[#a1a1aa] font-bold uppercase tracking-widest mb-12 flex-1 group-hover:text-[#27272A]">High-contrast bleaches, deep saturated tones, and chemical mastery.</p>
              <Link to="/services" className="font-black uppercase tracking-widest flex items-center gap-4 text-[#E63946]">
                Explore <span>→</span>
              </Link>
            </motion.div>

            {/* Editorial Styling */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="bg-[#1C1C1C] brutalist-border p-10 flex flex-col group hover:bg-[#E63946] transition-colors duration-500 hover:border-[#E63946]"
            >
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 group-hover:text-[#121212]">Editorial <br /> Styling</h3>
              <p className="text-[#a1a1aa] font-bold uppercase tracking-widest mb-12 flex-1 group-hover:text-[#121212]">Camera-ready finishing. Sculpting aesthetic perfection for impact.</p>
              <Link to="/services" className="font-black uppercase tracking-widest flex items-center gap-4 text-[#F4F4F5] group-hover:text-[#121212]">
                Explore <span>→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 md:px-12 bg-[#F4F4F5] text-[#121212] text-center brutalist-border-b border-[#27272A]">
          <motion.h2 {...fadeInUp} className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none mb-12">
            Initiate.
          </motion.h2>
          <button
            className="brutalist-pill bg-[#121212] text-[#F4F4F5] border-[#121212] px-16 py-6 font-black text-2xl md:text-4xl uppercase tracking-widest hover:bg-[#E63946] hover:border-[#E63946] transition-colors"
            onClick={handleBookAppointment}
          >
            Deploy Booking
          </button>
        </section>

        {/* Footer */}
        <footer className="bg-[#121212] text-[#F4F4F5] pt-24 pb-12 px-4 md:px-12 border-t border-[#27272A]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

            <div className="md:col-span-6">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                Salon <br /><span className="text-[#E63946]">Desk</span>.
              </h3>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-black uppercase tracking-widest text-[#a1a1aa] mb-6 text-sm">Navigation</h4>
              <ul className="space-y-4 font-bold uppercase tracking-widest">
                <li><Link to="/" className="hover:text-[#E63946] transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-[#E63946] transition-colors">The Menu</Link></li>
                <li><Link to="/appointment" className="hover:text-[#E63946] transition-colors">Secure Slot</Link></li>
                <li><Link to="/dashboard" className="hover:text-[#E63946] transition-colors">Portal</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-black uppercase tracking-widest text-[#a1a1aa] mb-6 text-sm">Coordinates</h4>
              <ul className="space-y-4 font-bold uppercase tracking-widest text-[#F4F4F5]">
                <li>Sector 4, Core Grid</li>
                <li>+91 (0) 999 888 7777</li>
                <li className="text-[#E63946]">TRANSMIT@SALONDESK.NET</li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#a1a1aa] font-bold uppercase tracking-widest text-xs border-t border-[#27272A] pt-8">
            <p>SYSTEM ONLINE. © 2026 SALON DESK.</p>
            <p>BRUTALIST ARCHITECTURE.</p>
          </div>
        </footer>
      </div>
    </PageWrapper>
  )
}

export default HomePage