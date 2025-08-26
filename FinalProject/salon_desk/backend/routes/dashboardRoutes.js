// routes/dashboardRoutes.js
import express from "express"
import Branch from "../models/Branch.js"
import Stylist from "../models/Stylist.js"
import Service from "../models/Service.js"
import Appointment from "../models/Appointment.js"

const router = express.Router()

// @route   GET /api/dashboard/overview
// @desc    Get dashboard metrics for owner
router.get("/overview", async (req, res) => {
  try {
    const branchCount = await Branch.countDocuments()
    const stylistCount = await Stylist.countDocuments()
    const serviceCount = await Service.countDocuments()
    const appointmentCount = await Appointment.countDocuments()

    // --- Total Revenue (join with services) ---
    const revenueAgg = await Appointment.aggregate([
      { $match: { status: "completed" } },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      { $unwind: "$serviceDetails" },
      { $group: { _id: null, totalRevenue: { $sum: "$serviceDetails.price" } } },
    ])
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0

    // --- Monthly Revenue Trend ---
    const revenueData = await Appointment.aggregate([
      { $match: { status: "completed" } },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      { $unwind: "$serviceDetails" },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          revenue: { $sum: "$serviceDetails.price" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]).then(data =>
      data.map(r => ({
        month: new Date(2025, r._id.month - 1).toLocaleString("default", { month: "short" }),
        revenue: r.revenue,
      }))
    )

    // --- Top 5 Services ---
    const topServices = await Appointment.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$service",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      { $unwind: "$serviceDetails" },
      {
        $project: {
          service: "$serviceDetails.name",
          count: 1,
        },
      },
    ])

    res.json({
      success: true,
      stats: {
        branches: branchCount,
        stylists: stylistCount,
        services: serviceCount,
        appointments: appointmentCount,
        revenue: totalRevenue,
      },
      revenueData,
      topServices,
    })
  } catch (error) {
    console.error("❌ Dashboard Error:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

export default router