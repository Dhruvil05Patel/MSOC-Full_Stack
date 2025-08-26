// controllers/appointmentController.js
import Appointment from "../models/Appointment.js"

// ✅ Get all appointments (owner/admin view)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("client", "name email")
      .populate("stylist", "name specialty")
      .populate("service", "name price")
      .sort({ date: -1 })

    res.json({ success: true, data: appointments })
  } catch (err) {
    console.error("❌ Error fetching appointments:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// ✅ Get appointments by client
export const getAppointmentsByClient = async (req, res) => {
  try {
    const { clientId } = req.params
    const appointments = await Appointment.find({ client: clientId })
      .populate("stylist", "name specialty")
      .populate("service", "name price")
      .sort({ date: -1 })

    res.json({ success: true, data: appointments })
  } catch (err) {
    console.error("❌ Error fetching client appointments:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// ✅ Get appointments by stylist
export const getAppointmentsByStylist = async (req, res) => {
  try {
    const { stylistId } = req.params
    const appointments = await Appointment.find({ stylist: stylistId })
      .populate("client", "name email")
      .populate("service", "name price")
      .sort({ date: -1 })

    res.json({ success: true, data: appointments })
  } catch (err) {
    console.error("❌ Error fetching stylist appointments:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// ✅ Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { client, guestName, service, stylist, branch, date, time } = req.body;

    if ((!client && !guestName) || !service || !stylist || !branch || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const appointment = new Appointment({
      client: client || undefined,
      guestName: guestName || undefined,
      service,
      stylist,
      branch,
      date,
      time,
      status: "booked",
    });

    await appointment.save();

    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    console.error("❌ Error creating appointment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!["booked", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" })
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    res.json({ success: true, data: updated })
  } catch (err) {
    console.error("❌ Error updating appointment:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// ✅ Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Appointment deleted" })
  } catch (err) {
    console.error("❌ Error deleting appointment:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}