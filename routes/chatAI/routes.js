const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');   // Middleware para manejar la subida de archivos
const path = require('path');
const sendMessageAi = require('../../controllers/sendMessageAi');
const deleteOldAudio = require('../../midlewares/deleteAudio');
const { PassThrough } = require('stream');


// Configuramos multer para guardar los archivos subidos en una carpeta 'uploads'
const storage = multer.diskStorage({
    // Definimos el destino donde se guardarán los archivos
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    // Definimos el nombre del archivo, agregando un sufijo único para evitar duplicados
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });


// Inicializamos multer con la configuración de almacenamiento definida anteriormente
const upload = multer({ storage: storage });




router.post("/", deleteOldAudio ,upload.single('file'),async(req,res) =>{
    //necesitamos midlewares de verificacion de usuario para enviar los audios, y hasta analiza el tema deverificacion facial 
   try {    
        const result = await sendMessageAi(req.file.path);



        const audioPath = path.resolve('./test.mp3');
        if (fs.existsSync(audioPath)) {
            const audio = fs.readFileSync(audioPath);
            if (audio) {
                console.log("Encontramos el audio ", audio);
            }
            const audioBase64 = audio.toString('base64');
            res.status(200).json({ result, audio: audioBase64 });
        } else throw Error("Audio does not exist")

   } catch (error) {
    res.status(400).json({error:error.message})
    
   }
})



// router.post("/checkpass",async(req,res) =>{
//   //necesitamos midlewares de verificacion de usuario para enviar los audios, y hasta analiza el tema deverificacion facial 
//  try {    
//       const pass = req.body
//       //obtener pass del front 
//       const result = await checkPasssword(pass)
      
//       res.status(200).json({ result});
      
//  } catch (error) {
//     res.status(400).json({result});
  
//  }
// })v



// router.post("/jobinterview",async(req,res)=>{
//   console.log(req.query);
//   try {
//     /* obtener querys */
//     const {type} = req.query;
//     /*dependiende de el type se envia un prompt diferente  */
//     // const response = await 


    
    
//   } catch ({message}) {
//     res.status(400).json({error:error.message})
//   }
// }); 



module.exports = router

