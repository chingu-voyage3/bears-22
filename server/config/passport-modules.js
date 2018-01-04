// Imports
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
const facebookStrategy = require('passport-facebook').Strategy

const user = require('../model/user')
const keys = require('./keys')

// Set up Google Authentication
googleOptions = {
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/auth/google/redirect'
}

googleDevCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')

  //Check if user in database
  user.findUserByGoogleID(profile.id).then(current_user => {
    if (current_user) {
      //if user in DB send user data
      console.log('User exists: ' + current_user)
      done(null, current_user)
    } else {
      //Else Create new user then send data
      user.addGoogleDevUser(profile).then(created_user => {
        console.log('Added the user to database: ' + created_user)
        done(null, created_user)
      })
    }
  })
}

googleNGOCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')

  //Check if user in database
  user.findUserByGoogleID(profile.id).then(current_user => {
    if (current_user) {
      //if user in DB send user data
      console.log('User exists: ' + current_user)
      done(null, current_user)
    } else {
      //Else Create new user then send data
      user.addGoogleNGOUser(profile).then(created_user => {
        console.log('Added the user to database: ' + created_user)
        done(null, created_user)
      })
    }
  })
}

//Set up Facebook Authentication
facebookOptions = {
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: '/auth/facebook/redirect'
}

facebookDevCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')

  //Check if user in database
  user.findUserByFacebookID(profile.id).then(current_user => {
    if (current_user) {
      //if user in DB send user data
      console.log('User exists: ' + current_user)
      done(null, current_user)
    } else {
      //Else Create new user then send data
      user.addFacebookDevUser(profile).then(created_user => {
        console.log('Added the user to database: ' + created_user)
        done(null, created_user)
      })
    }
  })
}

facebookNGOCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')

  //Check if user in database
  user.findUserByFacebookID(profile.id).then(current_user => {
    if (current_user) {
      //if user in DB send user data
      console.log('User exists: ' + current_user)
      done(null, current_user)
    } else {
      //Else Create new user then send data
      user.addFacebookNGOUser(profile).then(created_user => {
        console.log('Added the user to database: ' + created_user)
        done(null, created_user)
      })
    }
  })
}

passport_middleware = {
  google: {},
  facebook: {}
}

passport_middleware.google.dev = function(req, res, next) {
  passport.use(new googleStrategy(googleOptions, googleDevCB))
  next()
}
passport_middleware.google.ngo = function(req, res, next) {
  passport.use(new googleStrategy(googleOptions, googleNGOCB))
  next()
}
passport_middleware.facebook.dev = function(req, res, next) {
  passport.use(new facebookStrategy(facebookOptions, facebookDevCB))
  next()
}
passport_middleware.facebook.ngo = function(req, res, next) {
  passport.use(new facebookStrategy(facebookOptions, facebookNGOCB))
  next()
}

module.exports = passport_middleware
//TODO: Handle rejected promises
