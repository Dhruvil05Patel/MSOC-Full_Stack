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
          client: user?.id,
          branch: formData.branch,
          service: formData.service,
          date: formData.date,
          time: formData.time,
        }
      });
      if (res.data.length > 0) {
        toast.error("YOU ALREADY HAVE AN APPOINTMENT FOR THIS SLOT.");
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
      toast.success("APPOINTMENT CONFIRMED.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error("FAILED TO BOOK APPOINTMENT");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-[#F4F4F5] font-black text-2xl tracking-widest uppercase">
        Loading Assets...
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen py-12 px-4 md:px-8 text-[#F4F4F5] flex flex-col items-center">

      {/* Editorial Header Image (Placeholder) */}
      <div className="w-full max-w-5xl h-64 md:h-96 brutalist-border mb-12 bg-[#1C1C1C] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521590832168-60cc2ec46101?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}></div>
        <h1 className="relative z-10 text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mix-blend-difference">
          Secure <br /> <span className="text-[#E63946]">Slot.</span>
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl"
      >
        <form onSubmit={handleSubmit} className="brutalist-border bg-[#1C1C1C] p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 gap-y-16">

          <div className="col-span-full">
            <p className="text-[#a1a1aa] uppercase tracking-widest text-lg font-bold">Step 1 — Location & Service</p>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-2xl font-black mb-4 uppercase tracking-tight">Select Branch</label>
            <select
              name="branch"
              required
              value={formData.branch}
              onChange={handleBranchChange}
              className="w-full p-4 bg-transparent brutalist-border-b border-[#27272A] focus:border-[#E63946] text-[#F4F4F5] font-bold uppercase tracking-widest outline-none appearance-none rounded-none"
            >
              <option value="" className="bg-[#121212]">-- CHOOSE A BRANCH --</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id} className="bg-[#121212]">
                  {branch.name} — {branch.address}
                </option>
              ))}
            </select>
          </div>

          {/* Service */}
          <div>
            <label className="block text-2xl font-black mb-4 uppercase tracking-tight">Select Service</label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleServiceChange}
              disabled={!formData.branch}
              className="w-full p-4 bg-transparent brutalist-border-b border-[#27272A] focus:border-[#E63946] text-[#F4F4F5] font-bold uppercase tracking-widest outline-none disabled:opacity-50 appearance-none rounded-none"
            >
              <option value="" className="bg-[#121212]">-- CHOOSE A SERVICE --</option>
              {services.map((s) => (
                <option key={s._id} value={s._id} className="bg-[#121212]">
                  {s.name} (₹{s.price})
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-full brutalist-border-t border-[#27272A] pt-12 mt-4">
            <p className="text-[#a1a1aa] uppercase tracking-widest text-lg font-bold">Step 2 — Professional & Schedule</p>
          </div>

          {/* Stylist */}
          <div className="col-span-full">
            <label className="block text-2xl font-black mb-4 uppercase tracking-tight">Preferred Stylist</label>
            <select
              name="stylist"
              required
              value={formData.stylist}
              onChange={handleChange}
              disabled={!formData.service}
              className="w-full max-w-md p-4 bg-transparent brutalist-border-b border-[#27272A] focus:border-[#E63946] text-[#F4F4F5] font-bold uppercase tracking-widest outline-none disabled:opacity-50 appearance-none rounded-none"
            >
              <option value="" className="bg-[#121212]">-- CHOOSE A STYLIST --</option>
              {stylists.map((stylist) => (
                <option key={stylist._id} value={stylist._id} className="bg-[#121212]">
                  {stylist.name} ({stylist.gender})
                </option>
              ))}
            </select>
          </div>

          {/* Name (for guests) */}
          {!user && (
            <div className="col-span-full">
              <label className="block text-2xl font-black mb-4 uppercase tracking-tight">Your Name (Guest)</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="ENTER YOUR NAME"
                className="w-full max-w-md p-4 bg-transparent brutalist-border text-[#F4F4F5] font-bold uppercase tracking-widest outline-none focus:border-[#E63946] placeholder-[#27272A]"
              />
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-2xl font-black mb-4 uppercase tracking-tight">Select Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-4 bg-transparent brutalist-border border-[#27272A] focus:border-[#E63946] text-[#F4F4F5] font-bold uppercase tracking-widest outline-none block"
            />
          </div>

          {/* Time Slot */}
          <div className="col-span-full">
            <label className="block text-2xl font-black mb-6 uppercase tracking-tight">Time Slot</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {availableTimes.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setFormData({ ...formData, time: slot })}
                  className={`py-4 font-mono text-xl font-bold uppercase tracking-widest transition-colors brutalist-pill
                    ${formData.time === slot
                      ? "bg-[#E63946] text-[#F4F4F5] border-[#E63946]"
                      : "bg-[#121212] text-[#a1a1aa] border-[#27272A] hover:bg-[#F4F4F5] hover:text-[#121212]"}`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {/* Hidden input to keep formData.time in sync for form submission */}
            <input type="hidden" name="time" value={formData.time} />
            {formData.time && (
              <div className="mt-8 text-[#E63946] font-bold uppercase tracking-widest text-lg">
                Selected Slot: <span className="font-black text-2xl">{formData.time}</span>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-full mt-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full brutalist-pill bg-[#F4F4F5] text-[#121212] font-black text-4xl md:text-5xl py-8 hover:bg-[#E63946] hover:text-[#F4F4F5] hover:border-[#E63946] transition-colors"
            >
              CONFIRM BOOKING
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AppointmentPage;
