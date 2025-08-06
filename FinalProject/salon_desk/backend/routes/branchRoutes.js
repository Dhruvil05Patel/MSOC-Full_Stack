import express from 'express'
import {
  createBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
} from '../controllers/branchController.js'

const router = express.Router()

router.post('/', createBranch)           // ✅ Add Branch
router.get('/', getAllBranches)          // List branches
router.put('/:id', updateBranch)         // Edit
router.delete('/:id', deleteBranch)      // Delete

export default router