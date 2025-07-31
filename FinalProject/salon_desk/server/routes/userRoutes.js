// server/routes/userRoutes.js
import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

// ✅ Test Route
router.post('/test', (req, res) => {
  console.log("🚀 Test route was hit!");
  res.status(200).json({ message: "Test route works" });
});

export default router