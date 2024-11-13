
let sessions = []; 

const findOrCreateSession = (clientId=null,messages=[], stage='', job='') =>{
    
    console.log('entre a find createSession');
    
    clientId = clientId.trim()
    if(!clientId) throw Error('Client id is not send to /conversationService/findOrCreateSession.js');
    
    console.log('id del cliente',clientId);
    
    //busco una conversacion especifica, si no existe comienzo una nueva
    const findConversation = sessions.findIndex(e => e.clientId === clientId );
    console.log("Conversacion encontrada ",findConversation);
    const preVersion =  sessions[findConversation];

    if (findConversation!== -1){
            //modifico session ya iniciada 
        sessions[findConversation] = { 
            clientId,
            stage :preVersion.stage,
            job : preVersion.job,
            messages : sessions[findConversation].messages.concat(messages),
        }
        console.log('MEMORIA ACTUALIZADA A :', sessions[findConversation]);
        
        return sessions[findConversation].messages;
    } 
    console.log("INICIO NUEVA CONVERSACION EN MEMORIA");

    sessions.push({clientId,messages,stage,job})
} ;






const cleanSession = (id=null) =>{
    console.log('entre a borar conversaciones', id);
    if (!id) throw Error('Id is undefined in /conversationService.js') 
    //borar la conversacion 


    const findConversation = sessions.findIndex(e => e.clientId === id )
    if (findConversation === -1) throw Error('Conversation is not found /conversationService.js')
    //new array without the findconversation
    sessions = sessions.filter(e => e.clientId !== id)
    return true 
}




const getSessions = (idUser=null) =>{
    if (idUser) {
        const index = sessions.findIndex(e =>e.clientId === idUser )
        if (index === -1) throw Error('Id user not found in sessions /conversationService.js');
        console.log('encontre a este usar   ',sessions[index]  );
        
        
        return sessions[index]

    }
    return sessions
}


module.exports = {
    findOrCreateSession,
    cleanSession,
    getSessions,
    sessions
}