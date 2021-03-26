const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoticeSchema = new Schema({

})
const Notice = mongoose.model('Notice', NoticeSchema)
module.export = Notice
