import Stylist from '../models/Stylist.js'

export const getAllStylists = async (req, res) => {
  try {
    console.log('🔥 Fetching all stylists...')
    const stylists = await Stylist.find()
      .populate('branch', 'name address')
      .sort({ createdAt: -1 })
    
    console.log(`✅ Found ${stylists.length} stylists`)
    res.status(200).json(stylists)
  } catch (err) {
    console.error('❌ Error fetching stylists:', err.message)
    res.status(500).json({ message: 'Failed to fetch stylists', error: err.message })
  }
}

export const createStylist = async (req, res) => {
  try {
    console.log('🔥 Creating new stylist:', req.body.name)
    
    // Check if stylist with same email already exists
    const existingStylist = await Stylist.findOne({ email: req.body.email })
    if (existingStylist) {
      console.log('⚠️ Stylist with email already exists:', req.body.email)
      return res.status(400).json({ message: 'Stylist with this email already exists' })
    }

    const stylist = await Stylist.create(req.body)
    console.log('✅ Stylist created successfully:', stylist.name)
    
    // Populate branch info before sending response
    await stylist.populate('branch', 'name address')
    res.status(201).json(stylist)
  } catch (err) {
    console.error('❌ Error creating stylist:', err.message)
    res.status(400).json({ message: 'Failed to create stylist', error: err.message })
  }
}

export const updateStylist = async (req, res) => {
  try {
    console.log('🔥 Updating stylist:', req.params.id)
    
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
      console.log('❌ Stylist not found:', id)
      return res.status(404).json({ message: 'Stylist not found' })
    }

    console.log('✅ Stylist updated successfully:', stylist.name)
    res.status(200).json(stylist)
  } catch (err) {
    console.error('❌ Error updating stylist:', err.message)
    res.status(400).json({ message: 'Failed to update stylist', error: err.message })
  }
}

export const deleteStylist = async (req, res) => {
  try {
    console.log('🔥 Deleting stylist:', req.params.id)
    
    const { id } = req.params
    const stylist = await Stylist.findByIdAndDelete(id)
    
    if (!stylist) {
      console.log('❌ Stylist not found:', id)
      return res.status(404).json({ message: 'Stylist not found' })
    }

    console.log('✅ Stylist deleted successfully:', stylist.name)
    res.status(200).json({ message: 'Stylist deleted successfully' })
  } catch (err) {
    console.error('❌ Error deleting stylist:', err.message)
    res.status(500).json({ message: 'Failed to delete stylist', error: err.message })
  }
}

export const getStylistById = async (req, res) => {
  try {
    console.log('🔥 Fetching stylist by ID:', req.params.id)
    
    const { id } = req.params
    const stylist = await Stylist.findById(id).populate('branch', 'name address')
    
    if (!stylist) {
      console.log('❌ Stylist not found:', id)
      return res.status(404).json({ message: 'Stylist not found' })
    }

    console.log('✅ Stylist found:', stylist.name)
    res.status(200).json(stylist)
  } catch (err) {
    console.error('❌ Error fetching stylist:', err.message)
    res.status(500).json({ message: 'Failed to fetch stylist', error: err.message })
  }
}