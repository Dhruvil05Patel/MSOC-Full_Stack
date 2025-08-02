import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stylist: { type: mongoose.Schema.Types.ObjectId, ref: 'Stylist' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: Date,
  time: String,
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment; 