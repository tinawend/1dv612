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
  const desc = document.querySelector('#desc')
  desc.textContent = 'Description: ' + data.description

  const title = document.querySelector('#titlenew')
  title.textContent = 'Title: ' + data.title
})

function option () {
  document.getElementById('issues').addEventListener('click', function () {
    const data = 'issueOption'
    socket.emit('click', data)
  })
  document.getElementById('allNote').addEventListener('click', function () {
    const data = 'allOption'
    socket.emit('click', data)
  })
}
option()
