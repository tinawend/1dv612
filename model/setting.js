const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)
const SettingSchema = new Schema({
  setting: { Type: String }
})
const Setting = mongoose.model('Setting', SettingSchema)
module.exports = Setting
