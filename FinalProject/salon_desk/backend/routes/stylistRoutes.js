import express from 'express'
const router = express.Router()

// your route handlers here
router.get('/', (req, res) => res.send('Stylist route works'))

export default router  // ✅ this is the key