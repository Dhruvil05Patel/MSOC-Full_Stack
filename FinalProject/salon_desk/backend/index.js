// server/index.js
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { createRequire } from 'module'
import userRoutes from './routes/userRoutes.js'
import stylistRoutes from './routes/stylistRoutes.js'
import { initializeCollections } from './utils/initCollection.js'
import ownerRoutes from './routes/ownerRoutes.js'
import branchRoutes from './routes/branchRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import dashboardRoutes from "./routes/dashboardRoutes.js"

const require = createRequire(import.meta.url)
const cors = require('cors')

// 🔐 Load .env variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 🔧 Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 🌐 Routes
app.get('/', (req, res) => res.send('Salon Desk Backend Running'))
app.use('/api/users', userRoutes)
app.use('/api/stylists', stylistRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/owner', ownerRoutes)
app.use('/api/branches', branchRoutes)
app.use("/api/dashboard", dashboardRoutes)

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