// server/controllers/ownerController.js
import Appointment from '../models/Appointment.js'
import Branch from '../models/Branch.js'
import Stylist from '../models/Stylist.js'
import Service from '../models/Service.js'

export const getOwnerDashboard = async (req, res) => {
  try {
    // 🧮 Aggregated Data - Fix revenue calculation by joining with Service
    const appointmentsWithServices = await Appointment.aggregate([
      {
        $lookup: {
          from: 'services',
          localField: 'service',
          foreignField: '_id',
          as: 'serviceData'
        }
      },
      {
        $unwind: '$serviceData'
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$serviceData.price' },
          totalAppointments: { $sum: 1 }
        }
      }
    ])

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

    const result = appointmentsWithServices[0] || { totalRevenue: 0, totalAppointments: 0 }

    res.status(200).json({
      summary: {
        revenue: `₹${result.totalRevenue?.toLocaleString() || 0}`,
        appointments: result.totalAppointments,
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