const fs = require('fs');
const path = require('path');

const VoiceToText = async (file,openai) => {
    console.log('      ====== voiceToText =====');
    //crear archivo de la ruta donde almaceno el audio del usuario
    const tempFilePath = path.join(__dirname, 'temp-audio.wav');
    fs.writeFileSync(tempFilePath, file);

    try {
       
        const response = await openai.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath),
            model: "whisper-1",
          });
        return response.text


    } catch (error) {
        throw Error('Error ocurred in the Voice to Text function', {error:error})
    } 
}

module.exports = {VoiceToText}