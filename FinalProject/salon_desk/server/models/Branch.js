import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: String,
  address: String,
  contactNumber: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Branch = mongoose.model('Branch', branchSchema);

export default Branch; 