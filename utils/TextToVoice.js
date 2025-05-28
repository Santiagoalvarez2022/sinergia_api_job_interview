const fs = require('fs');
const path = require('path');
const {URL_API} = process.env;

let date = 0
const TextToVoice = async (openIa,response,clientId) =>{
  date = date + 1 
  console.log('entre en el text to voice');
  
  let newAudio = await openIa.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: response, 
  });
  
  const directoryPath = path.resolve(`./public/ia/${clientId}`);
  
  try {
    // Leer todos los archivos en la carpeta de esa conversación
    const files = await fs.promises.readdir(directoryPath);
    
    // Eliminar cada archivo de audio
    for (const file of files) { 
      const filePath = path.resolve(directoryPath, file);
      await fs.promises.unlink(filePath); // Eliminar el archivo
    }
    console.log('Archivos antiguos eliminados');
  } catch (err) {
    console.error('Error al eliminar archivos antiguos:', err);
  }



  const speechFile = path.resolve(directoryPath, `currentAudio${date}.mp3`);

  // Verificar y crear la carpeta si no existe
  await fs.promises.mkdir(directoryPath, { recursive: true });

   // Eliminar el archivo de audio anterior si existe
   try {
    await fs.promises.unlink(speechFile); // Elimina el archivo anterior si existe
  } catch (err) {
    // Si no existe, no hace nada, ya que el archivo puede no estar presente
    console.log('No hay archivo previo para eliminar');
  }

  const buffer = Buffer.from(await newAudio.arrayBuffer());
  
  
  await fs.promises.writeFile(speechFile, buffer);
    if (newAudio.status !== 200) throw Error('Error al generar respuesta en audio')

      console.log('audio generado, ',`${URL_API}/audio/ia/${clientId}/currentAudio${date}.mp3` );
      
      console.log('sali del texto to voice');
      
    return { 
      success: true, 
      message: 'Archivo guardado correctamente',
      url:`${URL_API}/audio/ia/${clientId}/currentAudio${date}.mp3`
    };

}

module.exports = TextToVoice 
