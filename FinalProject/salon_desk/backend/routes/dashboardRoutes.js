import express from "express"
import Branch from "../models/Branch.js"
import Stylist from "../models/Stylist.js"
import Service from "../models/Service.js"
import Appointment from "../models/Appointment.js" // assuming you already have appointments
// import Dashboard from "../models/Dashboard.js"  // optional cache

const router = express.Router()

// @route   GET /api/dashboard/overview
// @desc    Get dashboard metrics for owner
router.get("/overview", async (req, res) => {
  try {
    const branchCount = await Branch.countDocuments()
    const stylistCount = await Stylist.countDocuments()
    const serviceCount = await Service.countDocuments()
    const appointmentCount = await Appointment.countDocuments()

    // Calculate revenue (assuming Appointment has `price` field)
    const revenueData = await Appointment.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
    ])
    const totalRevenue = revenueData[0]?.totalRevenue || 0

    res.json({
      success: true,
      data: {
        branches: branchCount,
        stylists: stylistCount,
        services: serviceCount,
        appointments: appointmentCount,
        revenue: totalRevenue,
      },
    })
  } catch (error) {
    console.error("❌ Dashboard Error:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

export default router