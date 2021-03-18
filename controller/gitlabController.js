const axios = require('axios')
const gitlabController = {}

gitlabController.index = async (req, res) => {
  if (req.headers['x-gitlab-token'] === 'ajhhdii8726jdjdkdjs') {
    console.log(req.body.object_attributes)
    res.status(200)
  }
}

gitlabController.login = async (req, res) => {
  res.redirect(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.APPLICATION_ID}&redirect_uri=http://ef9a7ed3698e.ngrok.io/auth&response_type=code&state=STATE&scope=api`)
}

gitlabController.auth = async (req, res) => {
  const parameters = `client_id=${process.env.APPLICATION_ID}&client_secret=${process.env.SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http://ef9a7ed3698e.ngrok.io/auth`
  axios.post('https://gitlab.lnu.se/oauth/token', parameters)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      console.log('My token:', token)
    })
  // console.log(parameters)
  res.send('correct')
}
module.exports = gitlabController
