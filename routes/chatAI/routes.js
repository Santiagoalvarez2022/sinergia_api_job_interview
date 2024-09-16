const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sendMessageAi = require('../../controllers/sendMessageAi');
const deleteOldAudio = require('../../midlewares/deleteAudio');
const { PassThrough } = require('stream');
const { newConversation } = require('../../controllers/messages/newConversation');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/newConversation',  upload.single('file'),newConversation )


module.exports = router














// router.post("/", deleteOldAudio ,upload.single('file'),async(req,res) =>{
//     //necesitamos midlewares de verificacion de usuario para enviar los audios, y hasta analiza el tema deverificacion facial 

    
    
    
//     try {    
//       //obtengo las conversaciones y las mando en cada envio 
//       const body =  req.body
//       console.log("body", body);
//       const result = await sendMessageAi(req.file.path);
      


//         const audioPath = path.resolve('./test.mp3');
//         if (fs.existsSync(audioPath)) {
//             const audio = fs.readFileSync(audioPath);
//             if (audio) {
//                 console.log("Encontramos el audio ", audio);
//             }
//             const audioBase64 = audio.toString('base64');
//             res.status(200).json({ result, audio: audioBase64 });
//         } else throw Error("Audio does not exist")

//    } catch (error) {
//     res.status(400).json({error:error.message})
    
//    }
// })