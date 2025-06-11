//redirection to routes
const express = require('express')
const mainRouter = express.Router()
const routerChat = require('./chatAI/routes')
const routerInterview = require('./interviews/jobInterview/router')
const routerLogin = require('./login/router')
const routerAdmin = require('./admin/router')
const routerFeedback = require('./feedbacks/router')
const routerBlog = require('./blogs/router')
const routerTag = require('./tags/router')
const routerAuthor = require('./authors/routes')
const openIa = require('../openIa/OpenIa')
const routerContact = require('./contactWithSinergia/router.js')



//get 'http://localhost:3001/api/chat/nreconversations'

mainRouter.use('/admin', routerAdmin);
mainRouter.use('/auth', routerLogin);
mainRouter.use('/interview', routerInterview);
mainRouter.use('/chat', routerChat);
mainRouter.use('/feedback', routerFeedback);
mainRouter.use('/blog', routerBlog);
mainRouter.use('/tag', routerTag);
mainRouter.use('/author', routerAuthor);
mainRouter.use('/contact', routerContact);

module.exports = mainRouter;