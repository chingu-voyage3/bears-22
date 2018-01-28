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
  user.findUserByID(id, function(user) {
    done(null, user)
  })
  //TODO: If user not found?
})

// Set up Github Authentication
githubOptions = {
  clientID: keys.github.clientID,
  clientSecret: keys.github.clientSecret,
  callbackURL: '/auth/github/redirect',
  scope: ['user:email']
}

githubCB = (accessToken, refreshToken, profile, done) => {
  console.log('Authenticated! Reached the callback')
  console.log(profile)
  user_github_email = profile.emails[0].value
  console.log('User email: ' + profile.emails[0].value)

  //Check if user is a chingu member
  //user.findUserByID(profile._json.id, function(current_user) {
  user.findUserByGithubEmail(user_github_email, function(current_user) {
    if (current_user) {
      console.log('User exists: ' + current_user)
      console.log(JSON.stringify(current_user))
      done(null, current_user)
    } else {
      console.log('Not a chingu member')
      var err = 'Not a chingu member'
      done(err)
    }
  })
}

//TODO: Handle rejected promises
passport.use(new githubStrategy(githubOptions, githubCB))
