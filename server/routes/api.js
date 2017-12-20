// Imports
const express = require('express')
const data = require('../data.json')

// Set up Router
const router = express.Router()

// Routes
// Serve Index Page

/*
router.get('/', (req, res) => {
  res.send(data)
})

router.get('/users', (req, res) => {})*/

router.get('/profile', (req, res) => {
  if (req.user) 
  	res.send(req.user)
  else 
  	res.send('Not logged in')
})

// Export Routes
module.exports = router
