import Stylist from '../models/Stylist.js'

export const getAllStylists = async (req, res) => {
  try {
    const stylists = await Stylist.find()
      .populate('branch', 'name address')
      .sort({ createdAt: -1 })
    
    res.status(200).json(stylists)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stylists', error: err.message })
  }
}

export const createStylist = async (req, res) => {
  try {
    
    // Check if stylist with same email already exists
    const existingStylist = await Stylist.findOne({ email: req.body.email })
    if (existingStylist) {
      console.log('⚠️ Stylist with email already exists:', req.body.email)
      return res.status(400).json({ message: 'Stylist with this email already exists' })
    }

    const stylist = await Stylist.create(req.body)
    
    // Populate branch info before sending response
    await stylist.populate('branch', 'name address')
    res.status(201).json(stylist)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create stylist', error: err.message })
  }
}

export const updateStylist = async (req, res) => {
  try {
    
    const { id } = req.params
    const updates = req.body

    // Check if email is being updated and if it conflicts with existing stylist
    if (updates.email) {
      const existingStylist = await Stylist.findOne({ 
        email: updates.email, 
        _id: { $ne: id } 
      })
      if (existingStylist) {
        console.log('⚠️ Email already exists for another stylist:', updates.email)
        return res.status(400).json({ message: 'Email already exists for another stylist' })
      }
    }

    const stylist = await Stylist.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).populate('branch', 'name address')

    if (!stylist) {
      return res.status(404).json({ message: 'Stylist not found' })
    }

    res.status(200).json(stylist)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update stylist', error: err.message })
  }
}

export const deleteStylist = async (req, res) => {
  try {
    
    const { id } = req.params
    const stylist = await Stylist.findByIdAndDelete(id)
    
    if (!stylist) {
      return res.status(404).json({ message: 'Stylist not found' })
    }

    res.status(200).json({ message: 'Stylist deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete stylist', error: err.message })
  }
}

export const getStylistById = async (req, res) => {
  try {
    
    const { id } = req.params
    const stylist = await Stylist.findById(id).populate('branch', 'name address')
    
    if (!stylist) {
      return res.status(404).json({ message: 'Stylist not found' })
    }

    res.status(200).json(stylist)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stylist', error: err.message })
  }
}
