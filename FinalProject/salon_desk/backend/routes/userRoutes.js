// server/routes/userRoutes.js
import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, profilePhoto } = req.body
    const updateData = { name, email, profilePhoto }
    
    if (password) {
      // In production, hash the password
      updateData.password = password
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, select: '-password' }
    )
    
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    
    res.json({ success: true, data: updatedUser })
  } catch (err) {
    console.error('Error updating user:', err)
    res.status(500).json({ success: false, message: 'Failed to update user' })
  }
})

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