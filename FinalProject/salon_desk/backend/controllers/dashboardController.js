// controllers/dashboardController.js
import Branch from "../models/Branch.js"
import Stylist from "../models/Stylist.js"
import Service from "../models/Service.js"
import Appointment from "../models/Appointment.js"
import Dashboard from "../models/Dashboard.js"

export const updateDashboard = async () => {
  try {
    // --- Counts ---
    const branches = await Branch.countDocuments()
    const stylists = await Stylist.countDocuments()
    const appointments = await Appointment.countDocuments()

    // --- Revenue ---
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
      { $group: { _id: null, total: { $sum: "$serviceDetails.price" } } },
    ])
    const revenue = revenueAgg[0]?.total || 0

    // --- Monthly Revenue ---
    const revenueDataAgg = await Appointment.aggregate([
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
    ])

    const revenueData = revenueDataAgg.map(r => ({
      month: new Date(2025, r._id.month - 1).toLocaleString("default", { month: "short" }),
      revenue: r.revenue,
    }))

    // --- Top Services ---
    const topServicesAgg = await Appointment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$service", count: { $sum: 1 } } },
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
      { $project: { service: "$serviceDetails.name", count: 1 } },
    ])

    // --- Save Snapshot ---
    const dashboardDoc = await Dashboard.findOneAndUpdate(
      {},
      {
        totalRevenue: revenue,
        totalAppointments: appointments,
        totalBranches: branches,
        totalStylists: stylists,
        topServices: topServicesAgg,
        revenueData,
        date: new Date(),
      },
      { upsert: true, new: true }
    )

    return dashboardDoc
  } catch (err) {
    console.error("❌ Dashboard update error:", err)
  }
}

export const getDashboardOverview = async (req, res) => {
  try {
    const dashboard = await updateDashboard()
    res.json(dashboard)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard data" })
  }
}