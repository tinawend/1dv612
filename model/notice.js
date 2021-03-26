const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoticeSchema = new Schema({
  title: { type: String },
  name: { type: String },
  description: { type: String },
  state: { type: String },
  creationdate: { type: String },
  updated: { type: String },
  time: { type: String },
  type: { type: String },
  id: { type: String }
})
const Notice = mongoose.model('Notice', NoticeSchema)
module.export = Notice
