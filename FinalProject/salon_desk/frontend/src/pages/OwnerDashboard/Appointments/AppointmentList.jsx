// src/pages/OwnerDashboard/Appointments/AppointmentList.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import toast from "react-hot-toast";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/appointments");
      setAppointments(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status });
      toast.success("Status updated");
      fetchAppointments();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`/appointments/${id}`);
      toast.success("Appointment excised");
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch {
      toast.error("Failed to delete appointment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-sm font-sans font-light tracking-widest uppercase text-[#1A1A1A]/40 animate-pulse">Synchronizing entries...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="border-b elegant-border-b pb-6 mb-8 mt-4">
        <h2 className="text-3xl font-serif text-[#1A1A1A]">
          Manage <span className="italic text-[#DDA7A5]">Reservations</span>
        </h2>
      </div>

      <div className="bg-white/50 backdrop-blur-sm border elegant-border overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#FAF9F6] border-b elegant-border-b">
            <tr>
              <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Client</th>
              <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Stylist</th>
              <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Service</th>
              <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Date</th>
              <th className="p-5 text-left font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Status</th>
              <th className="p-5 text-right font-sans text-[10px] tracking-widest uppercase text-[#1A1A1A]/60 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? appointments.map((appt) => (
              <tr key={appt._id} className="border-b border-[#1A1A1A]/5 hover:bg-[#FAF9F6]/50 transition-colors">
                <td className="p-5 font-serif text-lg text-[#1A1A1A]">
                  {appt.client?.name || appt.guestName || "Walk-In"}
                </td>
                <td className="p-5 text-xs font-light text-[#1A1A1A]/70">{appt.stylist?.name || "-"}</td>
                <td className="p-5 text-xs text-[#1A1A1A]/70">{appt.service?.name || "-"}</td>
                <td className="p-5 text-[10px] tracking-widest uppercase text-[#1A1A1A]/50">
                  {new Date(appt.date).toLocaleDateString()}
                </td>

                {/* Status Column */}
                <td className="p-5">
                  <span className={`text-[9px] uppercase tracking-widest font-medium ${appt.status === "pending" ? "text-yellow-600" :
                      appt.status === "completed" ? "text-green-600" :
                        "text-[#DDA7A5]"
                    }`}>
                    {appt.status}
                  </span>
                </td>

                {/* Actions Column */}
                <td className="p-5 text-right space-x-3 whitespace-nowrap">
                  {(appt.status === "pending" || appt.status === "booked") && (
                    <>
                      <button
                        onClick={() => updateStatus(appt._id, "completed")}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-green-600 hover:border-green-600 transition-colors"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateStatus(appt._id, "cancelled")}
                        className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-yellow-600 hover:border-yellow-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteAppointment(appt._id)}
                    className="font-sans text-[10px] tracking-widest uppercase border-b border-[#1A1A1A]/20 pb-0.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-[#1A1A1A]/40 font-serif italic text-sm">
                  The diary is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentList;
