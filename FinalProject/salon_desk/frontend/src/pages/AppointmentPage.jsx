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

  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([
    "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00",
  ]);

  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  // Fetch branches on mount
  useEffect(() => {
    fetchBranches();
  }, []);

  // Fetch services when branch changes
  useEffect(() => {
    if (formData.branch) {
      fetchServices(formData.branch);
      setFormData((prev) => ({ ...prev, service: "", stylist: "" })); // reset service & stylist
      setStylists([]); // reset stylists
    }
  }, [formData.branch]);

  // Fetch stylists when branch or service changes
  useEffect(() => {
    if (formData.branch && formData.service) {
      fetchStylists(formData.branch, formData.service);
      setFormData((prev) => ({ ...prev, stylist: "" })); // reset stylist
    }
  }, [formData.branch, formData.service]);

  // Pre-fill service if serviceId is in URL
  useEffect(() => {
    if (serviceId && services.length > 0) {
      const selectedService = services.find((s) => s._id === serviceId);
      if (selectedService) {
        setFormData((prev) => ({ ...prev, service: selectedService._id }));
      }
    }
  }, [serviceId, services]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/branches");
      setBranches(res.data);
    } catch (err) {
      toast.error("Failed to load branches");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async (branchId) => {
    try {
      setLoading(true);
      const res = await axios.get(`/branches/${branchId}/services`);
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const fetchStylists = async (branchId, serviceId) => {
    try {
      setLoading(true);
      const res = await axios.get(`/branches/${branchId}/stylists?serviceId=${serviceId}`);
      setStylists(res.data);
    } catch (err) {
      toast.error("Failed to load stylists");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBranchChange = (e) => {
    setFormData({
      ...formData,
      branch: e.target.value,
      service: "",
      stylist: "",
    });
    setServices([]);
    setStylists([]);
  };

  const handleServiceChange = (e) => {
    setFormData({
      ...formData,
      service: e.target.value,
      stylist: "",
    });
    setStylists([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for existing appointment (frontend check)
    try {
      const res = await axios.get('/appointments', {
        params: {
          client: user.id,
          branch: formData.branch,
          service: formData.service,
          date: formData.date,
          time: formData.time,
        }
      });
      if (res.data.length > 0) {
        toast.error("You already have an appointment for this service at this time.");
        return;
      }
    } catch (err) {
      // Optionally handle error
    }

    const payload = {
      service: formData.service,
      stylist: formData.stylist,
      branch: formData.branch,
      date: formData.date,
      time: formData.time,
    };
    if (user) {
      payload.client = user.id;
    } else {
      payload.guestName = formData.name;
    }
    try {
      await axios.post("/appointments", payload);
      toast.success("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/client/dashboard");
      }, 1000);
    } catch (err) {
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
          {/* Branch */}
          <div>
            <label className="block text-sm font-semibold mb-2">Select Branch</label>
            <select
              name="branch"
              required
              value={formData.branch}
              onChange={handleBranchChange}
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

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold mb-2">Select Service</label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleServiceChange}
              disabled={!formData.branch}
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
              disabled={!formData.service}
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

          {/* Name (for guests) */}
          {!user && (
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
          )}

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-2">Select Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none bg-white"
              style={{ fontSize: "1rem" }}
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-semibold mb-2">Time Slot</label>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setFormData({ ...formData, time: slot })}
                  className={`py-2 rounded-lg border transition 
                    ${formData.time === slot
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-pink-700 border-pink-200 hover:bg-pink-100"}`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {/* Hidden input to keep formData.time in sync for form submission */}
            <input type="hidden" name="time" value={formData.time} />
            {formData.time && (
              <div className="mt-2 text-pink-600 text-sm">
                Selected: <span className="font-bold">{formData.time}</span>
              </div>
            )}
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
