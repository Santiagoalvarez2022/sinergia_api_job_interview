const fs = require('fs');
const path = require('path');

let date = 0
const TextToVoice = async (openIa,response) =>{
  console.log("==== date", date);
  date = date + 1 
  let newAudio = await openIa.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: response,
  });
  
  console.log("respuesta mp3 =>", newAudio);
  
  const speechFile = path.resolve(`./public/ia/${date}.mp3`);
      const buffer = Buffer.from(await newAudio.arrayBuffer());
     await fs.promises.writeFile(speechFile, buffer)
     if (newAudio.status !== 200) throw Error('Error al generar respuesta en audio')
     return { success: true, message: 'Archivo guardado correctamente',url:`http://localhost:3001/audio/ia/${date}.mp3` };
}

module.exports = TextToVoice 
