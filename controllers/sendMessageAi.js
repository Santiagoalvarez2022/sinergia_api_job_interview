const {main} = require('../utils/OpenAI.js')

const sendMessageAi = async(pathFile) =>{
    //logic validaciones de tipo de datos, etc

    console.log("Controller props", pathFile);
   const result = await main({pathFile})

   console.log("response del controller", result);

} 

module.exports = sendMessageAi