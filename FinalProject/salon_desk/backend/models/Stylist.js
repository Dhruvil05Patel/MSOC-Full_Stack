import mongoose from 'mongoose';

const stylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialty: String,
  gender: { type: String, enum: ['male', 'female'], required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  experience: { type: Number, min: 0, max: 50, default: 0 },
  bio: String,
  isActive: { type: Boolean, default: true },
  joinDate: { type: Date, default: Date.now },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }] // services this stylist can perform
}, {
  timestamps: true
});

const Stylist = mongoose.model('Stylist', stylistSchema);

export default Stylist;
