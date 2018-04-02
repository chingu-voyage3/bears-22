const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  title: String,
  description: String,
  skills: Array,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  needsHelp: Boolean
})

module.exports = mongoose.model('project', projectSchema)
