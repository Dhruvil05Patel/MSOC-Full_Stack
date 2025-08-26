// src/pages/AppointmentPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

function AppointmentPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    stylist: "",
    branch: "",
    date: "",
    time: "",
  });
  const navigate = useNavigate();
  
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all services, stylists, branches
      const [servicesRes, stylistsRes, branchesRes] = await Promise.all([
        axios.get("/services"),
        axios.get("/stylists"),
        axios.get("/branches"),
      ]);

      setServices(servicesRes.data);
      setStylists(stylistsRes.data);
      setBranches(branchesRes.data);

      // If serviceId exists, pre-fill service
      if (serviceId) {
        const selectedService = servicesRes.data.find((s) => s._id === serviceId);
        if (selectedService) {
          setFormData((prev) => ({ ...prev, service: selectedService._id }));
        }
      }
    } catch (err) {
      console.error("Failed to fetch booking data:", err);
      toast.error("Failed to load booking form data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/appointments", {
      client: user.id, // <-- send user ID
      service: formData.service,
      stylist: formData.stylist,
      branch: formData.branch,
      date: formData.date,
      time: formData.time,
    });
      toast.success("Appointment booked successfully!");
      console.log("Booking Submitted:", formData);
      setTimeout(() => {
        navigate("/client/dashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to book appointment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} (₹{s.price}, {s.duration} mins)
                </option>
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
              {stylists.map((stylist) => (
                <option key={stylist._id} value={stylist._id}>
                  {stylist.name} ({stylist.gender})
                </option>
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
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name} - {branch.address}
                </option>
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

          {/* Submit */}
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

export default AppointmentPage;