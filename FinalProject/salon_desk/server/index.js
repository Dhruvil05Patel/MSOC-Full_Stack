// server/index.js
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { createRequire } from 'module'
import userRoutes from './routes/userRoutes.js'
import stylistRoutes from './routes/stylistRoutes.js'
import { initializeCollections } from './utils/initCollection.js'

const require = createRequire(import.meta.url)
const cors = require('cors')

// 🔐 Load .env variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 🔧 Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 🌐 Routes
app.get('/', (req, res) => res.send('Salon Desk Backend Running'))
app.use('/api/users', userRoutes)
app.use('/api/stylists', stylistRoutes)

// 🛢️ MongoDB Connection & Server Start
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'SalonDesk'
})
  .then(async () => {
    console.log('✅ MongoDB connected')
    await initializeCollections() // Optional seeding
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
  })