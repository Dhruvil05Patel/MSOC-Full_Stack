import express from 'express'
import Branch from '../models/Branch.js'
import Stylist from '../models/Stylist.js'
import Service from '../models/Service.js'
import {
  createBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
} from '../controllers/branchController.js'

const router = express.Router()

router.post('/', createBranch)           // ✅ Add Branch
router.get('/', async (req, res) => {
  const branches = await Branch.find();
  res.json(branches);
});          // List branches
router.get('/:branchId/services', async (req, res) => {
  const services = await Service.find({ branch: req.params.branchId });
  res.json(services);
});
router.get('/:branchId/stylists', async (req, res) => {
  const { serviceId } = req.query;
  const filter = { branch: req.params.branchId };
  if (serviceId) filter.services = serviceId;
  const stylists = await Stylist.find(filter);
  res.json(stylists);
});
router.put('/:id', updateBranch)         // Edit
router.delete('/:id', deleteBranch)      // Delete

export default router