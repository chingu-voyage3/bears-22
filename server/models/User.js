const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  githubID: String,
  email: String,
  username: String,
  name: String,
  location: String,
  bio: String,
  avatar_url: String,
  github_url: String,
  blog_url: String,
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
})

module.exports = mongoose.model('User', userSchema)
