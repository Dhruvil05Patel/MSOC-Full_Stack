// server/models/Owner.js
import mongoose from 'mongoose'

const ownerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  // Add owner-specific fields here
  branchesOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
})

export default mongoose.model('Owner', ownerSchema)