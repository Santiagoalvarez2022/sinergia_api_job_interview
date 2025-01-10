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



// const multer = require('multer');
// const { VoiceToText } = require('../utils/VoiceToText')
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// const {filetypemime} = require('magic-bytes.js');
// const ffmpeg = require('fluent-ffmpeg');

// const convertAudio = (buffer) => {
//     console.log('entre a convertir el audio');
    
//     return new Promise((resolve, reject) => {
//         const inputPath = './temp_input.mp4';
//         const outputPath = './temp_output.webm';
//         require('fs').writeFileSync(inputPath, buffer);

//         ffmpeg(inputPath)
//             .output(outputPath)
//             .on('end', () => {
//                 const convertedBuffer = require('fs').readFileSync(outputPath);
//                 resolve(convertedBuffer);
//             })
//             .on('error', (err) => reject(err))
//             .run();
//     });
// };



// mainRouter.post('/test', upload.single('file'), async(req,res)=>{
//     console.log('ENTRE A TEST');
//     console.log('REQ FILE',req.file);
//     try {
//          // Detectar el formato del archivo
//          const result = filetypemime(req.file.buffer);
//          console.log("resultado del analisis",result);
//          //analizo si contiene el tipo correcto 'audio/webm'
         
//          if (!result.includes('audio/webm')) {
//             //si no es el tipo correcto lo convierto
//             console.log('includes', result.includes('audio/webm'));
//             req.file.buffer = await convertAudio(req.file.buffer);
//             console.log('audio convertido ', req.file.buffer);
//         }
     
        
//     } catch (error) {
//         res.status(400).json({error:error.message}); 
        
//     }
// });


module.exports = mainRouter;