// server/routes/ownerRoutes.js
import express from 'express'
import { getOwnerDashboard } from '../controllers/ownerController.js'

const router = express.Router()

router.get('/dashboard', getOwnerDashboard)

export default router