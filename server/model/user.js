// Imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create user schema and model
const UserSchema = new Schema({
  githubID:{
    type: String
  },
  name: {
    type: String,
    required: [true, 'Name field is required']
  }
})
const User = mongoose.model('user', UserSchema)

var userModules = {}

userModules.addGithubUser = profile => {
  console.log(profile)
  return new User({
    githubID: profile.id,
    name: profile.displayName
  }).save()
}

userModules.findUserByID = id => {
  return User.findById(id)
}

userModules.findUserByGithubID = id => {
  return User.findOne({ githubID: id })
}

// Export models
module.exports = userModules

/*
grapqhl query
query{
  user(user_email: "averghes@usc.edu"){
    first_name,
    last_name
  }
}
*/
