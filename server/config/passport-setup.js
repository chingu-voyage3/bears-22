// Imports
const passport = require('passport')
const githubStrategy = require('passport-github2')
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

// Set up Github Authentication
githubOptions = {
  clientID: keys.github.clientID,
  clientSecret: keys.github.clientSecret,
  callbackURL: '/auth/github/redirect'
}

githubCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')

  //Check if user in database
  user.findUserByGithubID(profile.id).then(current_user => {
    if (current_user) {
      //if user in DB send user data
      console.log('User exists: ' + current_user)
      done(null, current_user)
    } else {
      //Else Create new user then send data
      user.addGithubUser(profile).then(created_user => {
        console.log('Added the user to database: ' + created_user)
        done(null, created_user)
      })
    }
  })
}

//TODO: Handle rejected promises
passport.use(new githubStrategy(githubOptions, githubCB))
