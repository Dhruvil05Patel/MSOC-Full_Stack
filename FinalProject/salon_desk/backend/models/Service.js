import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in minutes
    category: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
    },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // optional if service tied to branch
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);