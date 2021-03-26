const mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_LINK}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('open')
})

db.on('connected', () => {
  console.log('Opened conection')
})
module.exports = db
