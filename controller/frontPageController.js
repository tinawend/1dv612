const frontPageController = {}
// const fetch = require('node-fetch')

frontPageController.index = async (req, res) => {
  // console.log(token)

  // const projects = await result.map(group => ({
  //   name: group.name_with_namespace
  // }))

  res.render('home')
}
module.exports = frontPageController
