// Imports
const express = require('express')
const data = require('../data.json')

// Set up Router
const router = express.Router()

// Routes
// Serve Index Page

router.get('/', (req, res) => {
  res.send(data)
})

router.get('/users', (req, res) => {})

// Export Routes
module.exports = router
