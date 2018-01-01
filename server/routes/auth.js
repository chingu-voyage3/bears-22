// Imports
//all paths are with /auth/ prefix
const express = require('express')
const passport = require('passport')

// Set up Router
const router = express.Router()

// Authenticate with Github
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile']
  })
)

// Github redirect
//router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
//  console.log('Authenticated with Github! User: ' + req.user)
//})

router.get('/github/redirect',
  passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }),
);

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
  res.redirect('/')
  //res.send('Succesfully logged out!')
})

// Export Routes
module.exports = router
