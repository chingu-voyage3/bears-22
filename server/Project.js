const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const projectSchema = new Schema({
  title: String,
  description: String,
  skills: Array,
  help: Boolean,
  users: [{ type: ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('project', projectSchema)
