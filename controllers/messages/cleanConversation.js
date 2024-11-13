const {cleanSession } = require("../../services/conversationService");



const cleanConversation = async(req,res) =>{
    //obener client id por req y no por query
    console.log("=========================  Borrar session  ===================================== ");
    try {
        const clientId = req.user.id
        if(!clientId) throw Error('Id user not found');
        //obtengo los datos necesarios e inico la conversacion, respondo con un audio
        console.log("==================== ", clientId);
           
        const result = cleanSession(clientId)
        console.log(result, 'resultado del borrado');
        

        res.status(204).json(result);
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    cleanConversation
}