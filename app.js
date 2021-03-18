const express = require('express')
const app = express()
const port = 4000
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const router = require('./routes/routes')

require('dotenv').config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('socketio', io)

app.use('/', router)

app.listen(port)

io.on('connection', (socket) => {
  console.log('connect')
  socket.emit('message', 'You are connected!')
})
