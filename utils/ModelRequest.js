const modelRequest = async(messages, openia) =>{
    //El modelo de openia recibe un array de mensaje pero devuelve uno final que es igual a role:assistant, content:... 

    const completion = await openia.chat.completions.create({
      //conversation deber llegar desde el front
       messages: messages,
       model: "gpt-4o-mini",
    });

    if(completion.choices[0].message.refusal) throw Error('mensaje rechazado por el modelo IA');

    return completion.choices[0].message;

}

module.exports ={modelRequest};


/*

 if (!start) {
            console.log("comienzo proceso de transcripcion");
            console.log("====> recibo audio del frontend", req.body);
            console.log("====> recibo audio file", req.file);

            if (!req.file) throw Error('req.file is undefined ./newConversation.js')

            // Crea un archivo temporal a partir del archivo en memoria para poder pasarlo a OpenAI
            console.log("ENTRO A VOICETOTEXT");
            
            const transcription = await VoiceToText(req.file.buffer,openIa)
            console.log("ide del usuario",clientId,"  transcripcion del audio, ",transcription);

            //AHORA DEBO AÑADIR ESTA TRANSCRIPCION A LAMORIA STORAGE DONDE SE ENCUENTRA TODA LA CONVERSACION Y DE AHI ENVIAR AL GPT
            //COMIENZO ENVIANDO EL ID DEL USER POR QUERY DESPUES DEBERIA SER EL TOKEN

            console.log("===> CONVERSATION ARRAY, DEBERIA CAPUTARAR EL LOS MENSAJES ANTERIOES DEL ID", clientId);
            



*/