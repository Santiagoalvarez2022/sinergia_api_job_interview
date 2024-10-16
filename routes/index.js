//redirection to routes
const express = require('express')
const mainRouter = express.Router()
const routerChat = require('./chatAI/routes')
const routerInterview = require('./interviews/jobInterview/router')
const routerLogin = require('./login/router')
const routerAdmin = require('./admin/router')
mainRouter.use('/admin', routerAdmin)
mainRouter.use('/auth', routerLogin);
mainRouter.use('/interview', routerInterview);
mainRouter.use('/chat', routerChat)


module.exports = mainRouter;