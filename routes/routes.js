const express = require('express')
const router = express.Router()
const gitlabController = require('../controller/gitlabController')
const frontPageController = require('../controller/frontPageController')
router.get('/', frontPageController.index)
router.get('/getGitlab', gitlabController.login)
router.get('/auth', gitlabController.auth)
router.post('/logout', gitlabController.logout)
router.get('/selectGroup', gitlabController.selectGroup)
router.get('/selectGroup/:id', gitlabController.getSpecificGroup)
router.get('/selectGroup/:id/webhook', gitlabController.webhook)
router.post('/selectGroup/:id/webhook', gitlabController.socket)
module.exports = router
