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

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (formData.branch) {
      fetchServices(formData.branch);
      setFormData((prev) => ({ ...prev, service: "", stylist: "" }));
      setStylists([]);
    }
  }, [formData.branch]);

  useEffect(() => {
    if (formData.branch && formData.service) {
      fetchStylists(formData.branch, formData.service);
      setFormData((prev) => ({ ...prev, stylist: "" }));
    }
  }, [formData.branch, formData.service]);

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
        toast.error("You already have a reservation for this slot.");
        return;
      }
    } catch (err) {
      // Intentionally suppressed
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
      toast.success("Reservation Confirmed.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      toast.error("Failed to confirm reservation.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-[#1A1A1A] bg-[#FAF9F6] font-sans font-light text-xl tracking-widest uppercase animate-pulse">
        Preparing Booking Portal...
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-24 px-6 md:px-16 text-[#1A1A1A] flex flex-col items-center">

      <div className="w-full max-w-4xl text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif text-[#1A1A1A] mb-4"
        >
          Reserve Your <span className="italic text-[#DDA7A5]">Time</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-sans font-light text-[#1A1A1A]/60 max-w-md mx-auto"
        >
          Please provide your details below to secure a private session with our specialists.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="w-full max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-sm border elegant-border p-8 md:p-16 rounded-2xl shadow-sm">

          <div className="space-y-12">
            {/* Step 1 */}
            <div>
              <h3 className="font-serif text-2xl mb-8 border-b elegant-border-b pb-4">1. Location & Treatment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Sanctuary</label>
                  <select
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleBranchChange}
                    className="elegant-input appearance-none bg-transparent cursor-pointer"
                  >
                    <option value="">Select a location</option>
                    {branches.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {branch.name} — {branch.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Treatment</label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleServiceChange}
                    disabled={!formData.branch}
                    className="elegant-input appearance-none bg-transparent cursor-pointer disabled:opacity-50"
                  >
                    <option value="">Select a treatment</option>
                    {services.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} (₹{s.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="font-serif text-2xl mb-8 border-b elegant-border-b pb-4">2. Specialist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Specialist</label>
                  <select
                    name="stylist"
                    required
                    value={formData.stylist}
                    onChange={handleChange}
                    disabled={!formData.service}
                    className="elegant-input appearance-none bg-transparent cursor-pointer disabled:opacity-50"
                  >
                    <option value="">Select a professional</option>
                    {stylists.map((stylist) => (
                      <option key={stylist._id} value={stylist._id}>
                        {stylist.name}
                      </option>
                    ))}
                  </select>
                </div>

                {!user && (
                  <div className="space-y-2">
                    <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Your Name (Guest)</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="elegant-input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="font-serif text-2xl mb-8 border-b elegant-border-b pb-4">3. Date & Time</h3>
              <div className="space-y-8">
                <div className="max-w-xs space-y-2">
                  <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="elegant-input text-[#1A1A1A]"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/60">Available Slots</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {availableTimes.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`py-3 text-sm font-sans font-light rounded-md border transition-all duration-300
                              ${formData.time === slot
                            ? "bg-[#DDA7A5] text-white border-[#DDA7A5] shadow-md"
                            : "bg-transparent text-[#1A1A1A] border-[rgba(26,26,26,0.1)] hover:border-[#DDA7A5]"}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="time" value={formData.time} />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8 text-center">
              <button
                type="submit"
                className="elegant-button-filled w-full md:w-auto px-24 py-4"
              >
                Confirm Reservation
              </button>
            </div>

          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AppointmentPage;
