const frontPageController = {}

const Notification = require('../model/notice')
frontPageController.index = async (req, res) => {
  const notifictions = await Notification.find({})
  const todaysDate = new Date().toISOString().slice(0, 10)
  const issues = await notifictions.filter(issue => issue.updated === todaysDate).map(issue => ({
    title: issue.title,
    description: issue.description
  }))
  res.render('home', { issues })
}
module.exports = frontPageController
