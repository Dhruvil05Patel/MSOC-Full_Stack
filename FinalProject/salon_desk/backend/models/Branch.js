import mongoose from 'mongoose'

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contact: String,
  manager: String,
}, {
  timestamps: true
})

export default mongoose.model('Branch', branchSchema)