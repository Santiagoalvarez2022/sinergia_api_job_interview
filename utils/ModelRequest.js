const { JoinFeedbackToUser } = require("../controllers/feedbacks/createFeedback");
const { getSessions } = require("../services/conversationService");
const normalizeText = require('../utils/normalizeText')
const modelRequest = async(messages, openia, clientId) =>{
    //El modelo de openia recibe un array de mensaje pero devuelve uno final que es igual a role:assistant, content:... 

    const completion = await openia.chat.completions.create({
      //conversation deber llegar desde el front
       messages: messages,
       model: "gpt-4o-mini",
    });

    if(completion.choices[0].message.refusal) throw Error('mensaje rechazado por el modelo IA');

    const  message = completion.choices[0].message;
    console.log('==================> message' , message);
    const find = message.content.trim().includes('#FEEDBACKFINAL')
    console.log('==================> FIND' , find);

    if (find) { 
      console.log('entre al condicional ide client ', clientId);
      
      const userfound = getSessions(clientId)
      console.log(userfound, 'usuario encontrado');
      const contentFeedback = normalizeText(message.content)

      await JoinFeedbackToUser( contentFeedback, userfound.job, userfound.stage ,  clientId)


      return {finishSession : true,...completion.choices[0].message};
    }

    return completion.choices[0].message;

}

module.exports ={modelRequest};


