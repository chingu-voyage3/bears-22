const express = require('express')
const authRouter = express.Router()
const passport = require('passport')

authRouter.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('http://localhost:3000/')
})

authRouter.get(
  '/auth/github',
  passport.authenticate('github', {
    scope: ['profile']
  })
)

authRouter.get(
  '/auth/github/redirect',
  passport.authenticate('github'),
  (req, res) => {
    // dev mode: http://localhost:3000/   prod mode: /
    res.redirect('http://localhost:3000/')
  }
)

const authCheck = (req, res, next) => {
  if (req.user) {
    // If logged in
    next()
  } else {
    // If user is not logged in
    res.redirect('http://localhost:8080/auth/github')
  }
}

authRouter.get('/isLoggedIn', function(req, res) {
  if (req.user) {
    console.log(req.user)
    res.send(req.user)
  } else {
    console.log('Not logged in')
    res.send('Not logged in')
  }
})

module.exports = authRouter
