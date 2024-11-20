const {cleanSession } = require("../../services/conversationService");
const fs = require('fs');
const path = require('path');


const cleanConversation = async(req,res) =>{
    //obener client id por req y no por query
    console.log("=========================  Borrar session  ===================================== ");
    try {
        const clientId = req.user.id
        if(!clientId) throw Error('Id user not found');
        //obtengo los datos necesarios e inico la conversacion, respondo con un audio
        console.log("==================== ", clientId);
           
        //borar en storage
        const result = cleanSession(clientId)
        console.log(result, 'resultado del borrado');
        //borar audios
        if (result) {
            const directoryPath = path.resolve(`./public/ia/${clientId}`);

                try {
                    // Eliminar la carpeta y su contenido
                    await fs.promises.rm(directoryPath, { recursive: true, force: true });
                    console.log(`Carpeta eliminada: ${directoryPath}`);
                } catch (error) {
                    console.error(`Error al eliminar la carpeta: ${error.message}`);
                }
        }

        res.status(204).json({deleteStorage:result});
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    cleanConversation
}