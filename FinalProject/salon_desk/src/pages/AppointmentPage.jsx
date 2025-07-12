import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";

function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    stylist: "",
    branch: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", formData);
  };

  const services = ["Haircut", "Facial", "Bridal Makeup", "Hair Spa"];
  const stylists = ["Priya Sharma", "Raj Malhotra", "Ananya Desai"];
  const branches = ["Ahmedabad", "Mumbai", "Delhi"];

  return (
    <div className="bg-pink-50 min-h-screen py-12 px-4 flex items-center justify-center">
      {/* Animated Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-lg border border-pink-100"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 text-center mb-6">
          Book Appointment
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
          Fill out the form below and our team will confirm your slot.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Same form inputs as before */}
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold mb-2">Select Service</label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
            >
              <option value="">-- Choose a Service --</option>
              {services.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Stylist */}
          <div>
            <label className="block text-sm font-semibold mb-2">Preferred Stylist</label>
            <select
              name="stylist"
              required
              value={formData.stylist}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
            >
              <option value="">-- Choose a Stylist --</option>
              {stylists.map((stylist, i) => (
                <option key={i} value={stylist}>{stylist}</option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-semibold mb-2">Select Branch</label>
            <select
              name="branch"
              required
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
            >
              <option value="">-- Choose a Branch --</option>
              {branches.map((branch, i) => (
                <option key={i} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-2">Select Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold mb-2">Time Slot</label>
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          {/* Animated Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-pink-600 transition"
          >
            Confirm Appointment
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AppointmentPage
