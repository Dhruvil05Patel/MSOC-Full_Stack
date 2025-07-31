import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const cors = require('cors')

// Routes
import userRoutes from './routes/userRoutes.js'
//import stylistRoutes from './routes/stylistRoutes.js'

// Utility
import { initializeCollections } from './utils/initCollections.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewareapp.use(cors())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Parse JSON bodies
app.use(express.json())

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'SalonDesk'
})
  .then(async () => {
    console.log('✅ MongoDB connected')

    // Optional: Initialize collections or dummy data
    await initializeCollections()

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
  })

app.get('/', (req, res) => res.send('Salon Desk Backend Running'))
app.use('/api/users', userRoutes)


