const openIa = require("../../openIa/OpenIa");
const TextToVoice = require("../../utils/TextToVoice.js");
const { VoiceToText } = require("../../utils/VoiceToText");
const { sessions, findOrCreateSession } = require("../../services/conversationService");
const { modelRequest } = require("../../utils/ModelRequest");

 

const newConversation = async(req,res) =>{
    //obener client id por req y no por query

    const clientId = req.user.id
    //obtengo los datos necesarios e inico la conversacion, respondo con un audio
    console.log("========================  Nueva Peticion  =====================================");

    let conversation = [];
    try {
        //analizo si tiene la query start que significa si es primer mensaje
        //si es el primer mensaje no necesito hacer un voice to text
        // url?start=true&&clientId=asdasd
        const {start, job, stage} = req.query; 

        console.log('id client', clientId);
        
        if (start) { 
            //PRIMERA CONVERSACION 
            //OBTENGO RESPUESTA DEL MODELO DEL MENSAJE
            const completion = await modelRequest(req.body, openIa, clientId)
            console.log("COMPLETION ", completion);

            const messages = req.body;
            messages.push(completion)

            //CREO UNA NUEVA SESION EN MEMORIA
            const startSession = findOrCreateSession(clientId,messages,stage,job);
            console.log('SESSIONES EN EL LOCAL STORAGE ', sessions );
            
            //GENERO RESPUESTA DE VOZ 
            //COMPLATION.CONTENT tiene el mensaje de 
            const audio = await TextToVoice(openIa,completion.content,clientId)
            if (audio.success) {
                // Envía el archivo de audio como respuesta
                res.status(200).json({
                   audioUrl: audio.url,
                   transcription: completion
               }); 
            }


            
        } else {
            
            console.log('CONVERSACION INICIAD')
            if (!req.file) throw Error('req.file is undefined ./newConversation.js');
            
            //TRANSCRIPCION DE LA RESPUESTA DEL USUARIO
            const transcription =  await VoiceToText(req.file.buffer,openIa);

            //modifico la session para pasarle toda la conversacion 
            const updatedSession = findOrCreateSession(clientId,[{role: 'user', content: transcription}],stage,job);

            //ENVIO TODA LA CONVERSACION AL MODELO PARA GENERAR UNA RESPUESTA MAS CORRECTA   
            const completion = await modelRequest(updatedSession, openIa,clientId);

            console.log('RESPUESTA DEL MODELO ', completion);
            
            //GUARDO RESPUESTAS DEL MODELO 
            findOrCreateSession(clientId, [completion] )


            //GENERO Y DEVUELVO AUDIO  
            const audio = await TextToVoice(openIa,completion.content,clientId)

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