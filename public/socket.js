// const socket = window.io()
// socket.on('hello', (arg) => {
//   console.log(arg)
// })
const socket = window.io()
socket.on('message', function (message) {
  console.log('The server has a message for you: ' + message)
})

socket.on('webhook', function (data) {
  console.log(data)
})
