// models/Dashboard.js
import mongoose from "mongoose"

const dashboardSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  totalRevenue: { type: Number, required: true },
  totalAppointments: { type: Number, required: true },
  topService: { type: String }, // optional
  topStylist: { type: String }, // optional
}, { timestamps: true })

export default mongoose.model("Dashboard", dashboardSchema)