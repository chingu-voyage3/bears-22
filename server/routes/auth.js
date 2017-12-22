// Imports
const express = require('express')
const passport = require('passport')

// Set up Router
const router = express.Router()

// Authenticate with Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
)

// Google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('Authenticated with Google! User: ' + req.user)
    res.redirect('/ ');
})

// Authenticate with Facebook
router.get('/auth/facebook', passport.authenticate('facebook'))

// Facebook redirect
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res) => {
    //res.send('Authenticated with Facebook! User: ' + req.user)
    console.log('Authenticated with Facebook! User: ' + req.user)
    res.redirect('/ ');
  }
)

//get user object
router.get(
  '/user', (req, res) => {
    res.json(req.user);
  }
)

// Logout
router.get('/logout', (req, res) => {
  req.logout()
  res.send('Succesfully logged out!')
})

// Export Routes
module.exports = router
