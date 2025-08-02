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

// ✅ Simple GET test route for Safari
router.get('/test', (req, res) => {
  console.log("🚀 GET Test route was hit!");
  res.status(200).json({ message: "GET Test route works", timestamp: new Date().toISOString() });
});

export default router