const express = require('express')
const app = express()
const port = 4000
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const router = require('./routes/routes')
const session = require('express-session')
var hbs = require('express-handlebars')
const Setting = require('./model/setting')
require('dotenv').config()
require('./db/dbConnect')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('socketio', io)

app.use(express.static('public'))
// handlebars
app.engine('handlebars', hbs())
app.set('view engine', 'handlebars')
// session
const SESS_NAME = 'sid'
app.use(session({
  name: SESS_NAME,
  secret: 'klemrfewncjxnj',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use('/', router)

// socket

io.on('connection', (socket) => {
  console.log('connect')
  socket.emit('message', 'You are connected!')
  socket.on('click', info)
  function info (data) {
    console.log(data)
    const setting = new Setting({
      setting: data
    })
    if (Setting.count() === 0) {
      setting.save()
    } else {
      Setting.remove({})
      setting.save()
    }
  }
})
server.listen(process.env.PORT || port)
