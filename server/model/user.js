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
  },
  bio: {
    type: String,
    default: ""
  },
  skills: {
    type: [String],
    default: []
  },
  location:{
    type: String
  },
  picture: {
    type: String
  },
  contact: {
    type: String
  },
  team_pref: {
    type: [String]
  },
  role: {
    type: String
  }
})
const User = mongoose.model('user', UserSchema)

var userModules = {}
userModules.addGoogleDevUser = profile => {
  return new User({
    googleID: profile.id,
    name: profile.displayName,
    role: "dev"
  }).save()
}

userModules.addGoogleNGOUser = profile => {
  return new User({
    googleID: profile.id,
    name: profile.displayName,
    role: "ngo"
  }).save()
}

userModules.addFacebookDevUser = profile => {
  return new User({
    facebookID: profile.id,
    name: profile.displayName,
    role: "dev"
  }).save()
}

userModules.addFacebookNGOUser = profile => {
  return new User({
    facebookID: profile.id,
    name: profile.displayName,
    role: "ngo"
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
