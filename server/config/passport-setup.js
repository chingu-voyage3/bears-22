// Imports
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')
const facebookStrategy = require('passport-facebook').Strategy

const user = require('../model/user')
const keys = require('./keys')

//Serialize user -> user object to unique user ID(Stored in cookie)
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//Deserialize user -> unique user ID(from cookie) to user object
passport.deserializeUser((id, done) => {
  user.findUserByID(id).then(user => {
    done(null, user)
  })
  //TODO: If user not found?
})

// Set up Google Authentication
googleOptions = {
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/auth/google/redirect'
}

googleCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')

  //Check if user in database
  user.findUserByGoogleID(profile.id).then(current_user => {
    if (current_user) {
      //if user in DB send user data
      console.log('User exists: ' + current_user)
      done(null, current_user)
    } else {
      //Else Create new user then send data
      user.addGoogleUser(profile).then(created_user => {
        console.log('Added the user to database: ' + created_user)
        done(null, created_user)
      })
    }
  })
}

//TODO: Handle rejected promises
passport.use(new googleStrategy(googleOptions, googleCB))

//Set up Facebook Authentication
facebookOptions = {
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: '/auth/facebook/redirect'
}

facebookCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')

  //Check if user in database
  user.findUserByFacebookID(profile.id).then(current_user => {
    if (current_user) {
      //if user in DB send user data
      console.log('User exists: ' + current_user)
      done(null, current_user)
    } else {
      //Else Create new user then send data
      user.addFacebookUser(profile).then(created_user => {
        console.log('Added the user to database: ' + created_user)
        done(null, created_user)
      })
    }
  })
}

//TODO: Handle rejected promises
passport.use(new facebookStrategy(facebookOptions, facebookCB))
