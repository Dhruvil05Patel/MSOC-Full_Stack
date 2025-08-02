import Branch from '../models/Branch.js'

export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 })
    res.json(branches)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch branches', error: err.message })
  }
}

export const createBranch = async (req, res) => {
  try {
    const { name, address, contact, manager } = req.body

    const branch = new Branch({ name, address, contact, manager })
    await branch.save()

    res.status(201).json(branch)
  } catch (err) {
    console.error('❌ Branch creation failed:', err.message)
    res.status(500).json({ message: 'Server Error' })
  }
}

export const updateBranch = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updated = await Branch.findByIdAndUpdate(id, updates, { new: true })
    res.json({ message: 'Branch updated', branch: updated })
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message })
  }
}

export const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params
    await Branch.findByIdAndDelete(id)
    res.json({ message: 'Branch deleted' })
  } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message })
  }
}