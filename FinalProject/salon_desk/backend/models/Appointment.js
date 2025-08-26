import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // for registered users
  guestName: { type: String }, // for guests
  stylist: { type: mongoose.Schema.Types.ObjectId, ref: 'Stylist' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  date: Date,
  time: String,
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;