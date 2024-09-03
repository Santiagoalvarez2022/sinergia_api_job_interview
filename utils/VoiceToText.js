const fs = require('fs');

const VoiceToText = async (pathFile, openai) => {

    try {
       
        const response = await openai.audio.transcriptions.create({
            file: fs.createReadStream(pathFile),
            model: "whisper-1",
          });
        return response.text


    } catch (error) {
        throw Error('Error ocurred in the Voice to Text function', {error:error})
    } 
}

module.exports = {VoiceToText}