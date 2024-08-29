const fs = require('fs');
const path = require('path');

// Middleware para eliminar el archivo de audio anterior
const deleteOldAudio = async (req, res, next) => {
    try {
        console.log("Starting to delete old audio");
        const audioPath = path.resolve(`./test.mp3`);
            
            // Verificar si el archivo existe y eliminarlo
            if (fs.existsSync(audioPath)) {
                await fs.promises.unlink(audioPath);
                console.log(`Deleted old audio file: ${audioPath}`);
            }

        // Continuar con el siguiente middleware o ruta
        next();

    } catch (error) {
        // Manejo de errores en la eliminación del archivo
        console.error('Error deleting old audio file:', error);
        next(error); // Pasar el error al siguiente middleware de manejo de errores
    }
};

module.exports = deleteOldAudio;
