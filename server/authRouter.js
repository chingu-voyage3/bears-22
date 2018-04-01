const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile']
  })
)

router.get(
  '/github/redirect',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

const isAuthenticated = (req, res, next) => {
  if (req.user) return next()
  else
    return res.status(401).json({
      error: 'Not authenticated'
    })
}

router.get('/user', isAuthenticated, function(req, res) {
  res.status(200).json(req.user)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
