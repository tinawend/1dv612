const express = require('express')
const app = express()
const port = 4000
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const router = require('./routes/routes')
var hbs = require('express-handlebars')

require('dotenv').config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('socketio', io)

app.use(express.static('public'))
// handlebars
app.engine('handlebars', hbs())
app.set('view engine', 'handlebars')

app.use('/', router)

app.listen(port)

// io.on('connection', (socket) => {
//   console.log('connect')
//   socket.emit('message', 'You are connected!')
// })
