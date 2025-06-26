const express = require('express')
const router = express.Router()

// define the home page route
router.get('/what', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/all', (req, res) => {
  res.send('About birds')
})

module.exports = router
