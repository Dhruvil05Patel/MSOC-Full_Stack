// server/controllers/ownerController.js
import Appointment from '../models/Appointment.js'
import Branch from '../models/Branch.js'
import Stylist from '../models/Stylist.js'

export const getOwnerDashboard = async (req, res) => {
  try {
    // Example dummy values, replace with real aggregation if available
    const totalRevenue = 275000
    const totalAppointments = 340
    const totalBranches = 5

    const topBranches = [
      { name: 'Éclat Gandhinagar', appointments: 120, revenue: '₹80,000' },
      { name: 'Éclat Ahmedabad', appointments: 95, revenue: '₹70,000' }
    ]

    const starStylists = [
      { name: 'Priya Sharma', appointments: 75, rating: 4.9 },
      { name: 'Raj Malhotra', appointments: 65, rating: 4.8 }
    ]

    res.status(200).json({
      summary: {
        revenue: `₹${totalRevenue.toLocaleString()}`,
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