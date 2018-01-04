// Imports
//all paths are with /auth/ prefix
const express = require('express')
const passport = require('passport')

const passport_modules = require('../config/passport-modules')

// Set up Router
const router = express.Router()

// Authenticate with Google
router.get(
  '/dev/google',
  passport_modules.google.dev,
  passport.authenticate('google', {
    scope: ['profile']
  })
)

router.get(
  '/ngo/google',
  passport_modules.google.ngo,
  passport.authenticate('google', {
    scope: ['profile']
  })
)

// Google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('Authenticated with Google! User: ' + req.user)
  res.redirect('/ ')
})

// Authenticate with Facebook
router.get(
  '/dev/facebook',
  passport_modules.facebook.dev,
  passport.authenticate('facebook')
)
router.get(
  '/ngo/facebook',
  passport_modules.facebook.ngo,
  passport.authenticate('facebook')
)

// Facebook redirect
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res) => {
    //res.send('Authenticated with Facebook! User: ' + req.user)
    console.log('Authenticated with Facebook! User: ' + req.user)
    res.redirect('/ ')
  }
)

//get user object
function isAuthenticated(req, res, next) {
  if (req.user) return next()
  else
    return res.status(401).json({
      error: 'Not authenticated'
    })
}
router.get('/user', isAuthenticated, function(req, res) {
  res.status(200).json(req.user)
})

// Logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/ ')
  //res.send('Succesfully logged out!')
})

// Export Routes
module.exports = router
