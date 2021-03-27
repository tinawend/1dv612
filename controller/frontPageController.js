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

  const btn = document.querySelector('#btn')
  btn.onclick = function () {
    const rbs = document.querySelectorAll('input[name="choice"]')
    let selectedValue
    for (const rb of rbs) {
      if (rb.checked) {
        selectedValue = rb.value
        break
      }
    }
    req.session.selected = selectedValue
  }
  res.render('home', { issues, token })
}
module.exports = frontPageController
