//arrray conversation saved in memory ram
//estructure [{clientId:cookie or token, conversation :[]},{clientId:cookie or token, conversation :[]}]

let sessions = []; 
/*
clientId : identificador de user-conversacion
*/

const newSession = (clientId=null,messages=[]) =>{
    
    clientId = clientId.trim()
    if(!clientId) throw Error('Client id is not send to /conversationService.js');
    
    console.log(clientId);
    
    const findConversation = sessions.findIndex(e => e.clientId === clientId );
    console.log(findConversation);
    console.log(messages);
    
    if (findConversation!== -1){
        console.log("ACTUALIZO CONVERSACION EN MEMORIA");
        sessions[findConversation] = {
            ...sessions[findConversation],
            messages : sessions[findConversation].messages.concat(messages)
        }
        console.log('MEMORIA ACTUALIZADA A :', sessions[findConversation]);
        
        return sessions[findConversation].messages;
    } 
    console.log("INICIO NUEVA CONVERSACION EN MEMORIA");

    sessions.push({clientId,messages})
    return true
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





module.exports = {
    newSession,
    cleanCoversation,
    sessions
}