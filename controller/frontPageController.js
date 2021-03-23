const frontPageController = {}
const fetch = require('node-fetch')

frontPageController.index = async (req, res) => {
  const token = req.session.token
  console.log(token)
  const fetchGroups = await fetch('https://gitlab.lnu.se/api/v4/groups?min_access_level=30', {
    headers: { access_token: token }
  })
  const result = await fetchGroups.json()
  const groups = await result.map(group => ({
    name: group.full_name
  }))
  // const projects = await result.map(group => ({
  //   name: group.name_with_namespace
  // }))
  console.log(groups)
  res.render('home', { token })
}
module.exports = frontPageController
