// models/Dashboard.js
import mongoose from "mongoose"

const dashboardSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  totalRevenue: { type: Number, default: 0 },
  totalAppointments: { type: Number, default: 0 },
  totalBranches: { type: Number, default: 0 },
  totalStylists: { type: Number, default: 0 },
  topServices: [{ service: String, count: Number }],
  revenueData: [{ month: String, revenue: Number }],
}, { timestamps: true })

export default mongoose.model("Dashboard", dashboardSchema)