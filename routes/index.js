//redirection to routes
const express = require('express')
const mainRouter = express.Router()
const routerChat = require('./chatAI/routes')
const routerInterview = require('./interviews/jobInterview/router')
const routerLogin = require('./login/router')

mainRouter.use('/auth', routerLogin);
mainRouter.use('/interview', routerInterview);
mainRouter.use('/chat', routerChat)

module.exports = mainRouter;