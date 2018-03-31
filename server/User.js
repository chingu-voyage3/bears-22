const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  githubID: String,
  name: String
})

module.exports = mongoose.model('doum-user', userSchema)
