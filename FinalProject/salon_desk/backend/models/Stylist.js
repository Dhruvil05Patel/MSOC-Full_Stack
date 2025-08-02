import mongoose from 'mongoose';

const stylistSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  rating: Number,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
});

const Stylist = mongoose.model('Stylist', stylistSchema);

export default Stylist;