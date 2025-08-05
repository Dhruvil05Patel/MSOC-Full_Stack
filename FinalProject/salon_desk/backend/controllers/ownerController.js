// server/controllers/ownerController.js
import Appointment from '../models/Appointment.js'
import Branch from '../models/Branch.js'
import Stylist from '../models/Stylist.js'

export const getOwnerDashboard = async (req, res) => {
  try {
    // 🧮 Aggregated Data
    const totalRevenue = await Appointment.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } }
    ])
    const totalAppointments = await Appointment.countDocuments()
    const totalBranches = await Branch.countDocuments()

    // 🏢 Top Performing Branches (dummy for now)
    const topBranches = [
      { name: 'Éclat Gandhinagar', appointments: 120, revenue: '₹80,000' },
      { name: 'Éclat Ahmedabad', appointments: 95, revenue: '₹70,000' }
    ]

    // 💇 Star Stylists (dummy for now)
    const starStylists = [
      { name: 'Priya Sharma', appointments: 75, rating: 4.9 },
      { name: 'Raj Malhotra', appointments: 65, rating: 4.8 }
    ]

    res.status(200).json({
      summary: {
        revenue: `₹${totalRevenue[0]?.total?.toLocaleString() || 0}`,
        appointments: totalAppointments,
        branches: totalBranches
      },
      branches: topBranches,
      stylists: starStylists
    })
  } catch (error) {
    console.error('❌ Dashboard Error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}