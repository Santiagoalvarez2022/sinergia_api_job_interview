const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {filetypemime} = require('magic-bytes.js');
const ffmpeg = require('fluent-ffmpeg');


//converAudio se ejecuta cuando se detecta que el tipo de mime del archio es diferente al esperado 'audio/webm'; esta funcion convierte el archivo recibido al correcto. 
const convertAudio = (buffer) => {
    console.log('entre a convertir el audio');
    
    return new Promise((resolve, reject) => {
        const inputPath = './temp_input.mp4';
        const outputPath = './temp_output.webm';
        require('fs').writeFileSync(inputPath, buffer);

        ffmpeg(inputPath)
            .output(outputPath)
            .on('end', () => {
                const convertedBuffer = require('fs').readFileSync(outputPath);
                resolve(convertedBuffer);
            })
            .on('error', (err) => reject(err))
            .run();
    });
};


const verifyTypeMime = async(req,res,next) =>{
    console.log('entre a verifica mime');
    console.log('REQ FILE',req.file);
    try {
        //solo anañizo aquellas consultar que contengan audios,
        const {start} = req.query; 
        if (start) {
            //como es el inico de la conversacion no analizo 
            next()
        }

        if(!req.file.buffer) throw Error('Blob is nout found')
        const result = filetypemime(req.file.buffer);
        console.log("resultado del analisis",result);

        if (!result.includes('audio/webm')) {
            //si no es el tipo correcto lo convierto
            console.log('includes', result.includes('audio/webm'));
            req.file.buffer = await convertAudio(req.file.buffer);
            console.log('audio convertido ', req.file.buffer);

           
        }
        return next()
    } catch (error) {
       
    } finally {

    }
}

module.exports = verifyTypeMime;
