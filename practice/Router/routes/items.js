const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/home', (req, res) => {
  res.send('Hi World!')
})

router.put('/about', (req, res) => {
  res.send('Namaste World!')
})

router.delete('/id', (req, res) => {
  res.send('Bye World!')
})

module.exports = router
