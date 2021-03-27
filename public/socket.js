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
  const id = document.querySelectorAll('.hidden')
  for (let i = 0; i < id.length; i++) {
    if (parseInt(id[i].textContent) === data.id) {
      if (data.type === 'issue') {
        const description = document.querySelectorAll('.description')
        description[i].textContent = 'Description: ' + data.description
        const desc = document.querySelector('#descr')
        desc.textContent = 'Description: ' + data.description
      }

      const title = document.querySelectorAll('.title')
      title[i].textContent = data.title
      const status = document.querySelectorAll('.state')
      status[i].textContent = 'state: ' + data.state
      const updated = document.querySelectorAll('.updated')
      updated[i].textContent = 'latest version: ' + data.updated + ', kl: ' + data.time
    } else {
      if (data.type === 'note') {
        const comment = document.querySelector('#comments')
        comment.textContent = 'New comment: ' + data.description
      }
      const notice = document.querySelector('#notice')
      notice.style.visibility = 'visible'
      const tit = document.querySelector('#tit')
      tit.textContent = 'Title: ' + data.title
      const name = document.querySelector('#nam')
      name.textContent = 'Writer: ' + data.name
      const desc = document.querySelector('#descr')
      desc.textContent = 'Description: ' + data.description
    }
  }
})
