// src/pages/OwnerDashboard/Appointments/AppointmentList.jsx
import React, { useEffect, useState } from "react"
import axios from "../../../utils/axios"
import toast from "react-hot-toast"

function AppointmentList() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/appointments")
      setAppointments(res.data.data || [])
    } catch (err) {
      toast.error("Failed to load appointments")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status })
      toast.success("Status updated")
      fetchAppointments()
    } catch {
      toast.error("Failed to update status")
    }
  }

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`/appointments/${id}`)
      toast.success("Appointment deleted")
      setAppointments((prev) => prev.filter((a) => a._id !== id))
    } catch {
      toast.error("Failed to delete appointment")
    }
  }

  if (loading) return <p>Loading appointments...</p>

  return (
    <div>
      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Manage Appointments
      </h2>
      <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-pink-100">
          <tr>
            <th className="px-4 py-2">Client</th>
            <th className="px-4 py-2">Stylist</th>
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id} className="text-center border-t">
              <td className="px-4 py-2">{appt.client?.name || "N/A"}</td>
              <td className="px-4 py-2">{appt.stylist?.name || "N/A"}</td>
              <td className="px-4 py-2">{appt.service?.name || "N/A"}</td>
              <td className="px-4 py-2">
                {new Date(appt.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{appt.status}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => updateStatus(appt._id, "completed")}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(appt._id, "cancelled")}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteAppointment(appt._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentList