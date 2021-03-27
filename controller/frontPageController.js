const frontPageController = {}

const Notification = require('../model/notice')
frontPageController.index = async (req, res) => {
  const token = req.session.token
  const notifictions = await Notification.find({})
  const todaysDate = new Date().toISOString().slice(0, 10)
  const issues = await notifictions.filter(issue => issue.updated === todaysDate).map(issue => ({
    title: issue.title,
    description: issue.description
  }))

  const red = document.getElementById('red')
  if (red.checked) {
    req.session.red = 'red'
  }

  res.render('home', { issues, token })
}
module.exports = frontPageController
