const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  githubID: String,
  username: String,
  first_name: String,
  last_name: String,
  bio: String,
  linkedin_url: String,
  portfolio_url: String,
  website_url: String,
  twitter_url: String,
  blog_url: String,
  city: String,
  country: String
})

module.exports = mongoose.model('user', userSchema)
