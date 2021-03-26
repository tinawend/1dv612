const axios = require('axios')
const gitlabController = {}
const fetch = require('node-fetch')
const Notification = require('../model/notice')

gitlabController.login = (req, res) => {
  res.redirect(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.APPLICATION_ID}&redirect_uri=https://notifytw222eu.herokuapp.com/auth&response_type=code&state=STATE&scope=api`)
}

gitlabController.auth = async (req, res) => {
  const parameters = `client_id=${process.env.APPLICATION_ID}&client_secret=${process.env.SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=https://notifytw222eu.herokuapp.com/auth`
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

  const result = await fetchGroups.json()
  const groups = await result.map(group => ({
    name: group.full_name,
    id: group.id
  }))

  res.render('gitLab', { token, groups })
}

gitlabController.getSpecificGroup = async (req, res) => {
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

  res.render('spec', { subGroups, projects })
}

gitlabController.webhook = async (req, res) => {
  // const token = req.session.token
  // const fetchIssues = await fetch(`https://gitlab.lnu.se/api/v4/groups/${req.params.id}/issues`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // })
  // const result = await fetchIssues.json()
  const notifictions = await Notification.find({})
  const issues = await notifictions.map(issue => ({
    title: issue.title,
    description: issue.description
  }))

  res.render('webhook', { issues })
}

gitlabController.socket = async (req, res) => {
  const io = req.app.get('socketio')
  console.log(req.body.object_attributes)
  const issues = {
    title: req.body.object_attributes.title,
    name: req.body.user.name,
    description: req.body.object_attributes.description,
    state: req.body.object_attributes.state,
    creationdate: req.body.object_attributes.created_at.substring(0, 10),
    updated: req.body.object_attributes.updated_at.substring(0, 10),
    time: req.body.object_attributes.updated_at.substring(11, 19),
    type: req.body.event_type,
    id: req.body.object_attributes.iid
  }
  io.emit('webhook', issues)

  await axios.post(`${process.env.LINK_SLACK}`, {
    text: 'there has been a change on gitlab issues \n Type: ' + req.body.event_type + '\nDescription: ' + req.body.object_attributes.description
  })
  const notice = new Notification(issues)
  try {
    await notice.save()
  } catch (error) {
    console.log(error)
  }
}
module.exports = gitlabController
