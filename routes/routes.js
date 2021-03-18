const express = require('express')
const router = express.Router()
const gitlabController = require('../controller/gitlabController')
const frontPageController = require('../controller/frontPageController')
router.get('/', frontPageController.index)
router.post('/', gitlabController.index)
router.get('/getGitlab', gitlabController.login)
router.get('/auth', gitlabController.auth)
module.exports = router
