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




//get 'http://localhost:3001/api/chat/nreconversations'

mainRouter.use('/admin', routerAdmin);
mainRouter.use('/auth', routerLogin);
mainRouter.use('/interview', routerInterview);
mainRouter.use('/chat', routerChat);
mainRouter.use('/feedback', routerFeedback);
mainRouter.use('/blog', routerBlog);
mainRouter.use('/tag', routerTag);
mainRouter.use('/author', routerAuthor);



const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


mainRouter.post('/test', upload.single('file'),async(req,res)=>{
    console.log('ENTRE A TEST');
    console.log('REQ FILE',req.file);
    

    try {
        // const response = awaitVoiceToText(file,openIa)
        res.status(200).json({a:'hola' }); 
    } catch (error) {
        
    }
});


module.exports = mainRouter;