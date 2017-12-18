// Imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create user schema and model
const UserSchema = new Schema({
  googleID: {
    type: String
  },
  facebookID: {
    type: String
  },
  name: {
    type: String,
    required: [true, 'Name field is required']
  }
})
const User = mongoose.model('user', UserSchema)

var userModules = {}
userModules.addGoogleUser = profile => {
  return new User({
    googleID: profile.id,
    name: profile.displayName
  }).save()
}

userModules.addFacebookUser = profile => {
  return new User({
    facebookID: profile.id,
    name: profile.displayName
  }).save()
}

userModules.findUserByID = id => {
  return User.findById(id)
}

userModules.findUserByGoogleID = id => {
  return User.findOne({ googleID: id })
}

userModules.findUserByFacebookID = id => {
  return User.findOne({ facebookID: id })
}

// Export models
module.exports = userModules
