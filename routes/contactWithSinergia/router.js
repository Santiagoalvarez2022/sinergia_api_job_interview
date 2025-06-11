const express = require('express');
const emailService = require('../../services/nodemailer/nodemailer.js')

const router = express.Router();


//ruta para reciir los mensajes del home en nuestro email
router.post('/receive', async(req,res)=>{
    try {
        const {message, gmail_sender, name_sender,subject } = req.body;
        console.log('Entre en revibir email');
        if (!message || !gmail_sender || !name_sender || !subject) throw Error('Debes completar todos los datos ')
        await emailService.receiveMessage(name_sender, gmail_sender, message, subject);

        res.status(200).json('Mensaje enviado con exito')
    } catch (error) {
        res.status(400).json({message:error})
    }
});

module.exports = router;
