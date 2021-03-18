const frontPageController = {}

frontPageController.index = (req, res) => {
  res.render('home')
}
module.exports = frontPageController
