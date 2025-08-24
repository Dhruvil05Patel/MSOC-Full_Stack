// server/controllers/serviceController.js
import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("branch", "name"); // include branch name if needed
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, category, branch } = req.body;

    const newService = new Service({
      name,
      description,
      price,
      duration,
      category,
      branch,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Service not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};