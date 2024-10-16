//arrray conversation saved in memory ram
//estructure [{clientId:cookie or token, conversation :[]},{clientId:cookie or token, conversation :[]}]

let sessions = []; 
/*
clientId : identificador de user-conversacion
*/

const findOrCreateSession = (clientId=null,messages=[]) =>{
    
    console.log('entre a find createSession');
    
    clientId = clientId.trim()
    if(!clientId) throw Error('Client id is not send to /conversationService/findOrCreateSession.js');
    
    console.log('id del cliente',clientId);
    
    //busco una conversacion especifica, si no existe comienzo una nueva
    const findConversation = sessions.findIndex(e => e.clientId === clientId );
    console.log("Conversacion encontrada ",findConversation);
    
    if (findConversation!== -1){
            //modifico session ya iniciada 
        sessions[findConversation] = { 
            clientId,
            messages : sessions[findConversation].messages.concat(messages),
        }
        console.log('MEMORIA ACTUALIZADA A :', sessions[findConversation]);
        
        return sessions[findConversation].messages;
    } 
    console.log("INICIO NUEVA CONVERSACION EN MEMORIA");

    sessions.push({clientId,messages})
} ;






const cleanCoversation = (id) =>{
    if (!id) throw Error('Id is undefined in /conversationService.js') 
    //borar la conversacion 
    const findConversation = sessions.findIndex(e => e.clientId === id )
    if (findConversation ==-1) throw Error('Conversation is not found /conversationService.js')
    //new array without the findconversation
    sessions = sessions.filter(e => e.clientId !== id)
    return true 
}


const getSessions = () =>{
    return sessions
}


module.exports = {
    findOrCreateSession,
    cleanCoversation,
    getSessions,
    sessions
}