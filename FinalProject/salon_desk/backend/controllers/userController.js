// server/controllers/userController.js
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// POST /api/users/register
export const registerUser = async (req, res) => {
  console.log('🔥 Register called with:', req.body)

  const { name, email, password, phone, role } = req.body;

  try {
    console.log('🔍 Checking if user already exists:', email)
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('⚠️ User already exists:', email)
      return res.status(400).json({ message: 'User already exists' })
    }

    console.log('🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('📝 Creating new user...')
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || 'client' // Default to 'client' if not provided
    })

    await newUser.save()

    console.log('✅ User registered successfully:', email)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('❌ Register error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// POST /api/users/login
export const loginUser = async (req, res) => {
  console.log('🔥 Login attempt with:', { email: req.body.email })
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      console.log('❌ User not found:', email)
      return res.status(404).json({ message: 'User not found' })
    }

    console.log('✅ User found:', user.email)
    const isMatch = await bcrypt.compare(password, user.password)
    console.log('🔐 Password match:', isMatch)
    
    if (!isMatch) {
      console.log('❌ Invalid password for user:', email)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    )

    console.log('✅ Login successful for:', email)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
      token,
    })
  } catch (error) {
    console.error('❌ Login error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
