// backend/routes/appointmentRoutes.js
import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ==================== CREATE ==================== //

// @POST /api/appointments
// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { client, service, stylist, branch, date, time } = req.body;

    if (!client || !service || !stylist || !branch || !date || !time) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const appointment = new Appointment({
      client,   // should reference a Client model ID (adjust if you’re just storing name)
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
    res
      .status(500)
      .json({ success: false, message: "Failed to create appointment" });
  }
});

// ==================== READ ==================== //

// @GET /api/appointments (all)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("client", "name email")
      .populate("stylist", "name specialty")
      .populate("service", "name price")
      .sort({ date: -1 });

    res.json({ success: true, data: appointments });
  } catch (err) {
    console.error("❌ Error fetching appointments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @GET /api/appointments/today
router.get("/today", async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.find({
      date: { $gte: start, $lte: end },
    })
      .populate("client", "name email")
      .populate("stylist", "name specialty")
      .populate("service", "name price");

    res.json({ success: true, data: todayAppointments });
  } catch (err) {
    console.error("❌ Error fetching today's appointments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @GET /api/appointments/upcoming
router.get("/upcoming", async (req, res) => {
  try {
    const now = new Date();

    const upcomingAppointments = await Appointment.find({
      date: { $gt: now },
      status: { $ne: "cancelled" },
    })
      .sort({ date: 1 })
      .populate("client", "name email")
      .populate("stylist", "name specialty")
      .populate("service", "name price");

    res.json({ success: true, data: upcomingAppointments });
  } catch (err) {
    console.error("❌ Error fetching upcoming appointments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @GET /api/appointments/past
router.get("/past", async (req, res) => {
  try {
    const now = new Date();

    const pastAppointments = await Appointment.find({
      date: { $lt: now },
    })
      .sort({ date: -1 })
      .populate("client", "name email")
      .populate("stylist", "name specialty")
      .populate("service", "name price");

    res.json({ success: true, data: pastAppointments });
  } catch (err) {
    console.error("❌ Error fetching past appointments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ==================== UPDATE ==================== //

// @PUT /api/appointments/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["booked", "completed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Error updating appointment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ==================== DELETE ==================== //

// @DELETE /api/appointments/:id
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    console.error("❌ Error deleting appointment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;