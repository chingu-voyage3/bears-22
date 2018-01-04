// Imports
const passport = require('passport')

const user = require('../model/user')
//const keys = require('./keys')

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
