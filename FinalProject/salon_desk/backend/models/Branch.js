import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  contact: String,
  manager: String,
  // Optionally, you can add arrays for services and stylists if you want to populate them easily
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  stylists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stylist" }],
}, {
  timestamps: true
});

export default mongoose.model("Branch", branchSchema);