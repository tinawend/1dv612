const axios = require('axios')
const gitlabController = {}
const fetch = require('node-fetch')

// gitlabController.index = async (req, res) => {
//   if (req.headers['x-gitlab-token'] === 'ajhhdii8726jdjdkdjs') {
//     console.log(req.body.object_attributes)
//     res.status(200)
//   }
// }

gitlabController.login = async (req, res) => {
  res.redirect(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.APPLICATION_ID}&redirect_uri=http://4fc799c25396.ngrok.io/auth&response_type=code&state=STATE&scope=api`)
}

gitlabController.auth = async (req, res) => {
  const parameters = `client_id=${process.env.APPLICATION_ID}&client_secret=${process.env.SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http://4fc799c25396.ngrok.io/auth`
  axios.post('https://gitlab.lnu.se/oauth/token', parameters)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      console.log('My token:', token)
      req.session.token = token
      res.redirect('/selectGroup')
    })
}

gitlabController.selectGroup = async (req, res) => {
  const token = req.session.token
  const fetchGroups = await fetch('https://gitlab.lnu.se/api/v4/groups?min_access_level=40', {
    headers: { Authorization: `Bearer ${token}` }
  })
  // console.log(token)
  const result = await fetchGroups.json()
  const groups = await result.map(group => ({
    name: group.full_name,
    id: group.id
  }))
  // req.session.ids = { id: groups.map(element => element.id) }
  // console.log(groups)
  res.render('gitLab', { token, groups })
}

gitlabController.getSpecificGroup = async (req, res) => {
  // console.log(req.params.id)
  const token = req.session.token
  const fetchSpec = await fetch(`https://gitlab.lnu.se/api/v4/groups/${req.params.id}/subgroups?min_access_level=50`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const fetchproj = await fetch(`https://gitlab.lnu.se/api/v4/groups/${req.params.id}/projects?min_access_level=40`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const result = await fetchSpec.json()
  const subGroups = await result.map(subGroup => ({
    name: subGroup.name,
    id: subGroup.id
  }))
  const projResult = await fetchproj.json()
  const projects = await projResult.map(project => ({
    name: project.name,
    id: project.id
  }))
  console.log(subGroups)
  console.log(projects)
  res.render('spec', { subGroups, projects })
}

gitlabController.webhook = async (req, res) => {
  const token = req.session.token
  const fetchIssues = await fetch(`https://gitlab.lnu.se/api/v4/groups/${req.params.id}/issues`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const result = await fetchIssues.json()
  const issues = await result.map(issue => ({
    title: issue.title,
    description: issue.description
  }))
  // console.log(result)

  if (req.headers['x-gitlab-token'] === 'secretToken123') {
    console.log(req.body.object_attributes)
    res.status(200)
  }
  res.render('webhook', { issues })
}
module.exports = gitlabController
