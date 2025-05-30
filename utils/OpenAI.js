// require('dotenv').config()
const OpenAI = require('openai')
const {OPENAI_API_KEY} = process.env;
const fs = require('fs');
const path = require('path');
const {VoiceToTextoiceToText, VoiceToText} = require('./VoiceToText')
const openai = new OpenAI({
apiKey: OPENAI_API_KEY
});





async function main({pathFile}) {
//path es content ahora

  //convert voice to text
  const transcription = await VoiceToText(pathFile,openai)

  console.log("transcription",transcription);

  //get a response
  const completion = await openai.chat.completions.create({
    //conversation deber llegar desde el front
     messages: conversation,
     model: "gpt-4o-mini",
  });

  const response = completion.choices[0].message.content

  console.log("response =>",response);


  //do a voice 
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: response,
  });

  console.log("respuesta mp3 =>", mp3);

  const buffer = Buffer.from(await mp3.arrayBuffer());
  return await fs.promises.writeFile(speechFile, buffer)
  
 
  
}


const speechFile = path.resolve("./test.mp3");



module.exports = {
    main,
}