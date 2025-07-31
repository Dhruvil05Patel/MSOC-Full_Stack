import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  duration: String
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;