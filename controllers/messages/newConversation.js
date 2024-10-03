const openIa = require("../../openIa/OpenIa");
const TextToVoice = require("../../utils/TextToVoice.JS");
const path = require('path');
const fs = require('fs');
const { VoiceToText } = require("../../utils/VoiceToText");
const FormData = require('form-data');
const { newSession, sessions } = require("../../services/conversationService");
const { modelRequest } = require("../../utils/ModelRequest");
const { content } = require("googleapis/build/src/apis/content");

const newConversation = async(req,res) =>{
    //obtengo los datos necesarios e inico la conversacion, respondo con un audio
    console.log("=========================  Nueva Peticion  =====================================");
    let conversation = []
    try {
        //analizo si tiene la query start que significa si es primer mensaje
        //si es el primer mensaje no necesito hacer un voice to text
        const {start,clientId} = req.query; 
        if (start) { 
            //PRIMERA CONVERSACION 
         
            console.log('ENTRE EN EL CONDITIONAL');
            console.log('REQ.BODY', req.body);
            //OBTENGO RESPUESTA DEL MODELO
            const completion = await modelRequest(req.body, openIa)
            console.log("COMPLETION ", completion);

            const messages = req.body;
            messages.push(completion)

            //CREO UNA NUEVA SESION EN MEMORIA
            const startSession = newSession(clientId,messages)
            console.log('SESSIONES EN EL LOCAL STORAGE ', sessions );
            
            //GENERO RESPUESTA DE VOZ 
            //COMPLATION.CONTENT tiene el mensaje de 
            const audio = await TextToVoice(openIa,completion.content)
            if (audio.success) {
                // Envía el archivo de audio como respuesta
                res.status(200).json({
                   audioUrl: audio.url,
                   transcription: completion
               }); 
            }
        } else {
            /*NO ES EL PRIMER MENSAJE:
                - TRANSCRIBO LOS AUDIOS
                - ENVIO AUDIO MAS CONVERSACIONES PASADA AL MODELO 
                - OBTENGO RESPUSTEA DE LA IA 
                - GUARDO ESA RESPUESTA EN MEMORIA
                - GENERO Y DEVUELVO AUDIO    
            */
            console.log('NO ES EL PRIMER MENSAJE')
            if (!req.file) throw Error('req.file is undefined ./newConversation.js')
            const transcription =  await VoiceToText(req.file.buffer,openIa)

            //BUSCO CONVERSACIONES EN MEMORIA POR EL ID
            let updateConversation = newSession(clientId, [{role: "user", content:transcription} ] )
            console.log("UPDATE CONVERSATION ", updateConversation);
            

            //ENVIO CONVERSACION AL MODELO 
            const completion = await modelRequest(updateConversation, openIa)

            console.log('RESPUESTA DEL MODELO ', completion);
            
            //GUARDO RESPUESTAS DEL MODELO 
            updateConversation = newSession(clientId, [{role: "assistant", content:transcription} ] )
            console.log("UPDATE CONVERSATION ", updateConversation);

            //GENERO Y DEVUELVO AUDIO  
            const audio = await TextToVoice(openIa,completion.content)

            if (audio.success) {
                console.log('GENERE UN NUEVO AUDIO DESPUES DE LA MODIFICACION DE LA CONVERSACION');
                
                // Envía el archivo de audio como respuesta
                res.status(200).json({
                   audioUrl: audio.url,
                   transcription: completion
               }); 
            }
       ; 
        }


    } catch (error) {
        res.status(400).json({error:error.message})
    }
}






module.exports = {newConversation}  