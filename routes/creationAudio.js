const OpenAI = require('openai')
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
    apiKey: 'sk-proj-QlMzX7DUGTvJne7x4WevT3BlbkFJeMGvwvQHNSkQAgAUmEPp'
});


const text = "Hola soy una I A compañero de entrevista... Elije que aspecto de tu preparacion para una entrevista te gustaria entrenar hoy! "
const speechFile = path.resolve("./presentation.mp3");

const fn = async() => {

    
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "echo",
        input: text,
    });
    
    const buffer = Buffer.from(await mp3.arrayBuffer());
    return await fs.promises.writeFile(speechFile, buffer)
}
fn()
