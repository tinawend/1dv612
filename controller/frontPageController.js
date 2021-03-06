const frontPageController = {}
// const Setting = require('../model/setting')
const Notification = require('../model/notice')
frontPageController.index = async (req, res) => {
  const token = req.session.token
  const notifictions = await Notification.find({})
  const todaysDate = new Date().toISOString().slice(0, 10)
  const issues = await notifictions.filter(issue => issue.updated === todaysDate).map(issue => ({
    title: issue.title,
    description: issue.description
  }))

  res.render('home', { issues, token })
}

// frontPageController.settings = async (req, res) => {
//   // const io = req.app.get('socketio')
//   // io.emit('settings')
//   res.render('settings')
// }

module.exports = frontPageController
